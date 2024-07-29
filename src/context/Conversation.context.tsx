import { Conversations } from "@/pages/StoreDetailsPage";
import { createContext, useContext, useState } from "react";

interface AppState {
  conversations: Conversations[];
  setConversations: React.Dispatch<React.SetStateAction<Conversations[]>>;
  isDialogueOpen: boolean;
  setIsDialogueOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<Conversations[]>([]);
  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={{
        conversations,
        setConversations,
        isDialogueOpen,
        setIsDialogueOpen,
      }}
    >
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
