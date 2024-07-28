import { Conversations } from "@/pages/StoreDetailsPage";
import { createContext, useContext, useState } from "react";

interface AppState {
  conversations: Conversations[];
  setConversations: React.Dispatch<React.SetStateAction<Conversations[]>>;
}
const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<Conversations[]>([]);
  return (
    <AppContext.Provider value={{ conversations, setConversations }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
