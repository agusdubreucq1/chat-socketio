
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
// import { API_AUDIENCE, APP_CLIENT_ID, APP_DOMAIN } from './const.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-Query-devtools'

const queryClient = new QueryClient()
const API_AUDIENCE = process.env.API_AUDIENCE || ''
const APP_CLIENT_ID = process.env.APP_CLIENT_ID || ''
const APP_DOMAIN = process.env.APP_DOMAIN || ''


ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
  </QueryClientProvider>

)
