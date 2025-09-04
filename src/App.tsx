
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ConfigProvider, } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'

function App() {

  return (

    <StrictMode>

      <QueryClientProvider client={new QueryClient()}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: '#00b96b',
              // colorPrimary: '#fea200',
              // Alias Token
              // colorBgContainer: '#f4f8ef',
            },

          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </QueryClientProvider>
    </StrictMode>)
}

export default App
