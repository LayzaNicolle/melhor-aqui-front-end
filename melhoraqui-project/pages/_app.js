// pages/_app.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.css' // ou seu css global

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}