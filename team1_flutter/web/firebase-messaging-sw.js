importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

// Firebase 구성 객체 (당신이 제공한 값)
firebase.initializeApp({
  apiKey: "AIzaSyAZSPPcu36xfi8xQsAkhepbVQbghp7H0iA",
  authDomain: "pushmsg-bb8e9.firebaseapp.com",
  projectId: "pushmsg-bb8e9",
  storageBucket: "pushmsg-bb8e9.firebasestorage.app",
  messagingSenderId: "458479640546",
  appId: "1:458479640546:web:09ab499e248719581723bb",
  measurementId: "G-TL09Q8TQZJ"
});

// 메시지 핸들러 설정 (선택사항)
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // 원하면 알림 아이콘 경로 수정 가능
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
