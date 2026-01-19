import express from 'express';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const router = express.Router();
const LOG_FILE = path.join(process.cwd(), 'logs', 'app.log');

router.get('/', async (req, res) => {
    try {
        if (!fs.existsSync(LOG_FILE)) {
            return res.json([]);
        }

        // Read file stream
        const fileStream = fs.createReadStream(LOG_FILE);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const logs = [];
        const MAX_LINES = 500; // Limit to last 500 lines to prevent payload issues

        for await (const line of rl) {
            try {
                // Try to parse JSON lines, skip invalid ones
                const parsed = JSON.parse(line);
                logs.push(parsed);
            } catch (e) {
                // Determine if it looks like a log line, if so add as text
                if (line.trim()) {
                    logs.push({ msg: line, time: Date.now(), level: 30 });
                }
            }
        }

        // Return last N logs. 
        // Note: For very large files, this approach (reading all) is inefficient.
        // Optimization: Use `read-last-lines` package or seek from end.
        // For now, this is sufficient for typical app logs loop.
        const recentLogs = logs.slice(-MAX_LINES); // Chronological order (Oldest -> Newest)

        res.json(recentLogs);
    } catch (error) {
        console.error('Failed to read logs:', error);
        res.status(500).json({ error: 'Failed to retrieve logs' });
    }
});

export default router;
