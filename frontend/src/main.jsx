import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from "react-redux"
import store from './redux/store.js'
import { CookiesProvider } from "react-cookie";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <Provider store={store}>
      <App/>
    </Provider>,
  </CookiesProvider>
)
