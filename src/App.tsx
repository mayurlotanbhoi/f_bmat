import { useEffect } from 'react'

import './App.css'
import './assets/common.css'

import Router from './routes/Router'
import { appConfig } from './config/appCinfig'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { useFirebaseMessaging } from './hooks/useFirebaseMessaging'
// const clientId = import.meta.env.VITE_CLIENT_ID;



function App() {

  // console.log("clientId", clientId)
  useFirebaseMessaging('123467');

  // console.log("token", token, error, permission)


  useEffect(() => {
    const { app } = appConfig;
    const root = document.documentElement;
    // Suppose you fetch this from MongoDB or a context
    root.style.setProperty('--primary_color', app.theme.primaryColor);
    root.style.setProperty('--font-family', app.theme.font);
  }, []);

  // useEffect(() => {
  //   async function requestPermission() {
  //     const permission = await Notification.requestPermission();
  //     if (permission !== 'granted') {
  //       throw new Error('Permission not granted for Notification');
  //     }
  //   }
  //   requestPermission()

  // }, [])

  return (

    <>


      {/* <GoogleOAuthProvider clientId={clientId}> */}
      <Router />
      {/* </GoogleOAuthProvider> */}
    </>
  )
}

export default App
