import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';

/**
 * Loads all enabled tools for a user and formats them for AI providers.
 * @param {number} userId 
 * @returns {Promise<Array>} Array of tool definitions
 */
export const getToolsForUser = async (userId) => {
    const tools = await prisma.aiTool.findMany({
        where: { userId, isEnabled: true }
    });

    return tools.map(tool => ({
        // Common format, but we might need specific formats for OpenAI vs Gemini later
        // For now, we use a generic structure that we can map in the AI Service
        name: tool.name,
        description: tool.description,
        parameters: JSON.parse(tool.parameters || '{}'),
        // Internal metadata not sent to AI
        _internal: {
            id: tool.id,
            method: tool.method,
            baseUrl: tool.baseUrl,
            endpoint: tool.endpoint,
            headers: tool.headers ? JSON.parse(tool.headers) : {},
            body: tool.body ? JSON.parse(tool.body) : {},
            auth: {
                type: tool.authType,
                key: tool.authKey,
                token: tool.authToken,
                location: tool.authLocation
            }
        }
    }));
};

/**
 * Executes a tool by making the HTTP request.
 * @param {Object} toolInternalConfig - The _internal object from the tool list
 * @param {Object} args - The arguments provided by the AI
 * @returns {Promise<Object>} The API response
 */
export const executeTool = async (toolInternalConfig, args) => {
    const { method, baseUrl, endpoint, headers, auth } = toolInternalConfig;
    let urlString = `${baseUrl}${endpoint}`;

    // Replace path variables (e.g., /users/{id})
    for (const [key, value] of Object.entries(args)) {
        if (urlString.includes(`{${key}}`)) {
            urlString = urlString.replace(`{${key}}`, value);
        }
    }

    // Construct URL Object to handle query params safely
    const url = new URL(urlString);

    // Apply Authentication (Query Params)
    if (auth && auth.type === 'API_KEY' && auth.location === 'QUERY' && auth.key && auth.token) {
        url.searchParams.append(auth.key, auth.token);
    }

    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        }
    };

    // Apply Authentication (Headers)
    if (auth && auth.type !== 'NONE' && auth.token) {
        if (auth.type === 'BEARER') {
            fetchOptions.headers['Authorization'] = `Bearer ${auth.token}`;
        } else if (auth.type === 'API_KEY' && auth.location === 'HEADER' && auth.key) {
            fetchOptions.headers[auth.key] = auth.token;
        }
    }

    if (method !== 'GET' && method !== 'HEAD') {
        const bodyData = { ...args };
        fetchOptions.body = JSON.stringify(bodyData);
    } else {
        // For GET, add remaining args as query params
        for (const [key, value] of Object.entries(args)) {
            // Only add if not used in path replacement
            if (!endpoint.includes(`{${key}}`)) {
                url.searchParams.append(key, value);
            }
        }
    }

    try {
        logger.info(`Tool Execution: ${method} ${url.toString()}`);
        const response = await fetch(url.toString(), fetchOptions);

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        return {
            status: response.status,
            data
        };
    } catch (error) {
        logger.error(`Tool Execution Failed: ${error.message}`);
        return {
            error: error.message
        };
    }
};
