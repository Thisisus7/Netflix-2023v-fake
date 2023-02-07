import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import '../styles/globals.css'
import { AuthProvider } from '../hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* HOC (high order components) */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
