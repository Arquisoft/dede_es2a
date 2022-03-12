import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Auth0Provider } from '@auth0/auth0-react';

// react application
const domain = 'dev-o-6umpor.us.auth0.com';
const client_id = 'gVZPxJXH5Lx34bGRc8XHl6siZ4lJ72E0';

// machine-to-machine
//const domain = 'dev-o-6umpor.us.auth0.com';
//const client_id = 'gLsnBGpZ1IS7oA5wgA7KEENB1KdbCSiU';

// carlosazaustre
//const domain = 'carlosazaustre.eu.auth0.com';
//const client_id = 'w7SEmuLWO4OlvK3Yu6jHKljQKYlVk7Lb';

// default project
//const domain = 'dev-o-6umpor.us.auth0.com';
//const client_id = 'gkachxmRnqxjAyHnr6joR8be0gk2nE5I';

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Auth0Provider
      domain={domain}
      clientId={client_id}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </QueryClientProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
