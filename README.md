# Blitzschlag '26 - Official App

The official companion application for **Blitzschlag 2026**, the annual cultural festival of **MNIT Jaipur**. This app serves as a one-stop destination for participants to register for events, buy passes, view schedules, and stay updated with real-time notifications.

Developed by students of **MNIT Jaipur**.

---

## Features

### Authentication & Security

- **Hybrid Login:** Secure login via Email/Password and **Google Sign-In**.
- **Password Recovery:** Robust "Forgot Password" flow using Firebase Deep Linking (opens directly in-app).
- **Role-Based Access:** Distinct UI and permissions for Participants, Admins, and General Secretaries.

### Event & Pass Management

- **Dynamic Cart System:** Add multiple passes (Festival, Galaxy, Day-wise) to a cart.
- **Flagship Event Integration:** Conditional logic allows users to select a flagship event when purchasing premium passes.
- **Payment Verification:** Seamlessly upload payment screenshots directly from the gallery using `expo-image-picker`.
- **Search:** Advanced floating search bar to find events, clubs, or venues instantly.

### Schedule & Timeline

- **Interactive Timeline:** Day-wise event breakdown (Day 0 - Day 3).
- **Immersive UI:** Custom continuous zoom animations on the schedule header.
- **Sorting:** Auto-sorts events chronologically for easy navigation.

### Notifications

- **Push Notifications:** Integration with Expo Notifications service.
- **Custom Sounds:** Unique alert sounds for fest announcements.
- **Notification History:** In-app notification center grouped by date (Today/Yesterday) with swipe-to-delete functionality.

### Profile & Support

- **User Dashboard:** View role badges, personal details, and ticket status.
- **Support:** Easy access to contact information and developer credits.

---

## Tech Stack

- **Frontend:** React Native (Expo SDK 50+)
- **Language:** JavaScript / JSX
- **Authentication:** Firebase Auth
- **Storage:** Firebase Cloud Storage (for payment screenshots)
- **Backend:** Node.js / Express (Custom API)
- **Database:** MongoDB
- **Notifications:** Expo Notifications
- **Navigation:** React Navigation (Stack & Tab)

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo Go app on your physical device or an Android Emulator/iOS Simulator.

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/your-username/blitzschlag-app.git](https://github.com/your-username/blitzschlag-app.git)
    cd blitzschlag-app
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment**
    - Ensure `ip.js` points to your local or deployed backend URL.
    - Place your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) in the root directory.

4.  **Run the App**

    ```bash
    npx expo start
    ```

    - Press `a` for Android Emulator.
    - Scan the QR code with Expo Go.

---

## Firebase & Deep Linking Setup

To ensure **Google Login** and **Password Reset Deep Linking** work correctly:

1.  **SHA-1 Fingerprint:** Ensure your development and production SHA-1 keys are added to the Firebase Console.
2.  **Deep Linking:** The app is configured to handle links via the `blitz26` scheme and HTTPS intents.
3.  **Keystore:** The upload key `@aryan9026__frontend.jks` is required for building production APKs. **Do not share this file.**

---

## Developers (MNIT Jaipur)

| Name              | Role              |
| :---------------- | :---------------- |
| **Aryan Mishra**  | Native Developer  |
| **Lucky Agrawal** | Backend Developer |

---

## License

This project is proprietary to **Blitzschlag, MNIT Jaipur**. Unauthorized copying or distribution is strictly prohibited.

---

### Contact

For technical support or bug reports, please contact:
**Email:** blitzschlag@mnit.ac.in
