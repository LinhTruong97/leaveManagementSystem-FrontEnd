import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBIIrycrtFghb-I1JkVCQGshmgmZrlC9Wo",
  authDomain: "leavemanagementsystem-f2b30.firebaseapp.com",
  projectId: "leavemanagementsystem-f2b30",
  storageBucket: "leavemanagementsystem-f2b30.appspot.com",
  messagingSenderId: "558345746123",
  appId: "1:558345746123:web:ac2d89d91c3c4f9114cd4e",
  measurementId: "G-1YN1HTWT98",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Request a new FCM token
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BAvW0omK4RbOQNvqeWuWEx4XEmd017kvvLYDxBZBLo9pJ897O2rC06BY3GE1GTyuwQ80eR5HejCZZaHh-1QOhMg",
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
