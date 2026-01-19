import pino from 'pino';

import path from 'path';
import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

export const logger = pino({
    transport: {
        targets: [
            {
                target: 'pino/file',
                options: {
                    destination: path.join(logDir, 'app.log'),
                    mkdir: true
                }
            },
            {
                target: isDev ? 'pino-pretty' : 'pino/file',
                options: isDev ? { colorize: true } : { destination: 1 }
            }
        ]
    }
});
