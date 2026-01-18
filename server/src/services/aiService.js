
import { logger } from '../config/logger.js';

/**
 * Generate a response using OpenAI API.
 * @param {string} apiKey - The OpenAI API Key from user settings
 * @param {string} briefing - The system prompt/briefing
 * @param {string} userMessage - The message to respond to
 * @returns {Promise<string|null>} The generated response or null if failed
 */
export const generateResponse = async (apiKey, briefing, userMessage) => {
    if (!apiKey) {
        logger.warn('AI Service: No API Key provided');
        return null;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: briefing || 'You are a helpful assistant.' },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();

        if (!response.ok) {
            logger.error(`AI Service API Error: ${data.error?.message || response.statusText}`);
            return null;
        }

        return data.choices[0]?.message?.content?.trim() || null;
    } catch (error) {
        logger.error(`AI Service Exception: ${error.message}`);
        return null;
    }
};
