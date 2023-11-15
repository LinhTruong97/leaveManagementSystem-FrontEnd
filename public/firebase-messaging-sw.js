// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBIIrycrtFghb-I1JkVCQGshmgmZrlC9Wo",
  authDomain: "leavemanagementsystem-f2b30.firebaseapp.com",
  projectId: "leavemanagementsystem-f2b30",
  storageBucket: "leavemanagementsystem-f2b30.appspot.com",
  messagingSenderId: "558345746123",
  appId: "1:558345746123:web:ac2d89d91c3c4f9114cd4e",
  measurementId: "G-1YN1HTWT98",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
