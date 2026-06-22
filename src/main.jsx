import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.jsx'

// Sentry error tracking — production only
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://12c145ff9717642e126b2ab737bf8401@o4511609444958208.ingest.de.sentry.io/4511609452101712',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
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

const AppWithSentry = import.meta.env.PROD ? Sentry.withErrorBoundary(App, {
  fallback: (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
      <h2 style={{ color: '#0f172a' }}>Something went wrong</h2>
      <p>We've been notified and will fix this shortly.</p>
      <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '8px 20px', backgroundColor: '#1E3A8A', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Reload
      </button>
    </div>
  ),
}) : App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithSentry />
  </React.StrictMode>,
)