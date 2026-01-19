# Wabot Mobile Client

This is the mobile client for Wabot, built with React Native and Expo.

## Prerequisites
- Node.js (already installed)
- Expo Go app on your Android or iOS device.

## Setup
1.  Navigate to the mobile directory:
    ```bash
    cd mobile
    ```

2.  (Optional) Update API URL:
    - Open `mobile/api.js`.
    - Change `BASE_URL` to your computer's LAN IP address (e.g., `http://192.168.1.5:3003/api`) so your phone can reach the server.
    - Default is `http://10.0.2.2:3003/api` which works for Android Emulator + Docker.

## Running the App
1.  Start the development server:
    ```bash
    npx expo start
    ```
2.  Scan the QR code with the Expo Go app (Android) or Camera app (iOS).

## Features
- **Login**: Authenticate with your Wabot credentials.
- **Dashboard**: View active sessions and their status.
- **Credit Balance**: View your current credit balance.

## Project Structure
- `App.js`: Main entry point and navigation.
- `api.js`: API client configuration.
- `screens/`: Application screens (Login, Dashboard).
