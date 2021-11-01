import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/browser';

// import { Integrations } from '@sentry/tracing';
import App from './App';

// function FallbackComponent() {
//   return <div>An error has occurred</div>;
// }



// Sentry.init({
//   dsn: "http://7d1cb583c8644601b7fa700a4d522e9a@localhost:8080/2",
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });
Sentry.init({dsn: "http://7d1cb583c8644601b7fa700a4d522e9a@localhost:8080/2"});

// ReactDOM.render(
//   <React.StrictMode>
//     <Sentry.ErrorBoundary fallback={myFallback} showDialog>
//       <App />
//     </Sentry.ErrorBoundary>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
ReactDOM.render(
    <button onClick={() => { throw new Error("Caçilds")}}>Break the world</button>,
    document.getElementById("root")
  // <React.StrictMode>
  //     <App />
  // </React.StrictMode>,
  // document.getElementById("root")
);

