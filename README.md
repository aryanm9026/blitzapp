# Setup & Installation
Follow these steps to get the project running locally.

1. Backend Setup
The backend server connects to Firebase and exposes the API endpoints that the frontend consumes.

## 1. Navigate to the backend directory
cd backend

## 2. Install dependencies
npm install

## 3. Set up Firebase Admin
    - Create a project on the Firebase Console.
    - Generate a private key file (serviceAccountKey.json).
    - Place the downloaded `serviceAccountKey.json` file in the root of the `backend` directory.

## 4. Set up environment variables 
    - Create a .env file for your email credentials for OTP mailer as :
    MAIL_USER=ENTER-YOUR-USERMAIL
    MAIL_PASS=ENTER-YOUR-PASSKEY

## 5. Start the server
npm run dev

The server should now be running on http://localhost:3000

2. Frontend Setup
The frontend is the React Native mobile application that users interact with.

## 1. Navigate to the frontend directory
cd frontend

## 2. Install dependencies
npm install

## 3. Configure the API URL
    - Open the frontend files that make API calls (e.g., `app/Auth/AuthScreen.jsx`, `app/Home/HomePage.jsx`).
    - Find the `API_URL` constant.
    - Change the IP address to your computer's local network IP.
      (e.g., [http://192.168.1.7:3000](http://192.168.1.7:3000))
    - This is necessary for the Expo Go app on your phone to connect to the local server.

## 4. Start the Expo development server
npx expo start

## 5. A QR code will appear in the terminal.
    - Scan this QR code using the Expo Go app on your phone.
    - The app will now be running on your device.
