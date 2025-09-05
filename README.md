# GenieSMS (Expo frontend)

This repository contains a starter Expo frontend for the GenieSMS app.

What this includes:

- Expo project skeleton (package.json, app.json)
- Example screens demonstrating:
  - Lottie animation (lottie-react-native)
  - SVG rendering (react-native-svg)
  - File read/write with expo-file-system
  - File picking with expo-document-picker and upload demo
  - HTTP requests (axios + fetch example)
  - Push notification permission + token retrieval with expo-notifications

Next steps:

1. Run `npm install` or `expo install` to install dependencies. Prefer `expo install` for Expo-managed packages.
2. Start dev server: `npm start` or `expo start`.
3. Build the PHP backend API to accept uploads and push tokens.

Notes:

- The package versions in `package.json` target Expo SDK 48. Adjust SDK version if you prefer a newer Expo SDK.
- You'll need a physical device to test push notifications.

CSV & Excel notes:

- The app now supports picking and previewing CSV and Excel files in the Upload screen. CSVs are parsed with `papaparse` and Excel files with `xlsx` (SheetJS).
- For large files, prefer sending files directly to the backend and parsing server-side to avoid memory constraints on mobile devices.
- The current demo reads the picked file into memory and shows a small preview (up to 10 rows). Update `src/screens/UploadScreen.js` if you want different behavior (streaming, pagination, or server-side parsing).

Backend endpoints you may want to provide:

- POST /upload-file — accepts multipart/form-data or a JSON payload with base64 data; returns success and stored file id.
- POST /register-push-token — accepts { token, platform, userId } to register device tokens for push notifications.
