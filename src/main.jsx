import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.jsx'

// Sentry error tracking — production only
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://12c145ff9717642e126b2ab737bf8401@o4511609444958208.ingest.de.sentry.io/4511609452101712',
  });
}

// Microsoft Clarity — production only
if (import.meta.env.PROD) {
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script","xazk40hk7p");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)