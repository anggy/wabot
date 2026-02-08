

const BASE_URL = 'http://localhost:3002/api';

async function run() {
    // 1. Login
    console.log("Logging in..");
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'adminpassword' })
    });

    if (!loginRes.ok) {
        console.error("Login failed:", await loginRes.text());
        return;
    }

    const { token } = await loginRes.json();
    console.log("Got token:", token ? "YES" : "NO");

    // 2. Create Tool with "Legacy" field authLocation to test if it breaks
    console.log("Creating Tool...");
    const payload = {
        name: "test_tool_" + Date.now(),
        description: "test description",
        method: "GET",
        baseUrl: "https://example.com",
        endpoint: "/api/test",
        parameters: { type: "object", properties: { param1: { type: "string" } } },
        headers: {},
        body: {},
        authType: "NONE",
        // The problematic field
        authLocation: "HEADER"
    };

    const createRes = await fetch(`${BASE_URL}/ai/tools`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    const verifyText = await createRes.text();
    console.log("Status:", createRes.status);
    console.log("Response:", verifyText);
}

run();
