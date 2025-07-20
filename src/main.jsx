import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppTest from "./test/AppTest";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1) QueryClient örneğini oluştur
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2) Uygulamanı QueryClientProvider ile sar */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
