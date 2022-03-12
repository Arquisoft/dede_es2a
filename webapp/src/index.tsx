import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-o-6umpor.us.auth0.com';
const client_id = 'gVZPxJXH5Lx34bGRc8XHl6siZ4lJ72E0';

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
