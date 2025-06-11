

import Router from './routes/Router'
import useUiTheme from './view/home/useUiTheme'

// Typically in index.js/index.tsx or App.tsx
import './assets/common.css'
import './App.css'
// import "flatpickr/dist/flatpickr.min.css";


function App() {
  useUiTheme();

  // console.log("clientId", clientId)
  // console.log("token", token, error, permission)


  // useEffect(() => {
  //   const { app } = appConfig;
  //   const root = document.documentElement;
  //   // Suppose you fetch this from MongoDB or a context
  //   root.style.setProperty('--primary_color', app.theme.primaryColor);
  //   root.style.setProperty('--font-family', app.theme.font);
  // }, []);

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
