import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { persistStor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { io } from "socket.io-client";
import { BACKEND_URL } from "./constants";
import { AppProvider } from "./context/Conversation.context";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const socket = io(BACKEND_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStor}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
