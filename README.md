# Wabot HomesisLab - WhatsApp Automation Tool

Wabot is a powerful WhatsApp automation tool featuring a React dashboard and a Node.js Baileys server.

## Features
- **Multi-Device Support**: Connect multiple WhatsApp sessions.
- **Auto Reply**: Create keyword, regex, or exact match rules.
- **Broadcast**: Schedule messages (Text/Image) to contacts or groups.
- **User Management**: Multi-tenancy support with Admin/User roles.
- **API Integration**: Trigger external APIs or use webhooks.

## Quick Start (Docker)

The easiest way to run Wabot is using Docker Compose.

### Prerequisites
- Docker
- Docker Compose

### Installation

1.  Clone the repository.
2.  **Important**: Ensure the database file exists:
    ```bash
    touch server/dev.db
    ```
3.  Run the application:

    ```bash
    docker-compose up -d --build
    ```

3.  Access the application:
    - **Dashboard**: [http://localhost](http://localhost)
    - **API/Server**: [http://localhost:3002](http://localhost:3002)

### Default Credentials
- **Username**: `admin`
- **Password**: `adminpassword`

## Manual Installation

### Server
1.  Navigate to `server`: `cd server`
2.  Install dependencies: `npm install`
3.  Start server: `npm start`
4.  Server runs on port 3002.

### Client
1.  Navigate to `client`: `cd client`
2.  Install dependencies: `npm install`
3.  Start dev server: `npm run dev`
4.  Client runs on http://localhost:5173 (proxies to 3002).

## Persistent Data (Docker)
- Database: Persisted in `./server/dev.db` mounted to `/app/dev.db`.
- Sessions: Persisted in `./server/sessions`.
- Uploads: Persisted in `./server/uploads`.
# wabot
