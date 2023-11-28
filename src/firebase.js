import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FIREBASE_CONFIG, VAPID_KEY } from "./firebaseConfig";

const firebaseConfig = FIREBASE_CONFIG;
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Request a new FCM token
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
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
