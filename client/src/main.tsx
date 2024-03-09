
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { API_AUDIENCE, APP_CLIENT_ID, APP_DOMAIN } from './const.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={APP_DOMAIN}
    clientId={APP_CLIENT_ID}
  
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: API_AUDIENCE,
      scope: 'read:openid profile read:current_user read:current_user_metadata read:users read:name read:email',
    }}
  >
    <App />

  </Auth0Provider>

)
