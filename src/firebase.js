import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
// Request a new FCM token
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    if (currentToken) {
      console.log("Current FCM token:", currentToken);
      return currentToken;
    } else {
      console.log(
        "No FCM token available. Requesting permission to generate one."
      );
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
};

// Listen for incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Received message:", payload);
      resolve(payload);
    });
  });

export { messaging };
