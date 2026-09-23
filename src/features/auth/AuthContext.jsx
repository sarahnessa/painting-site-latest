import { createContext, useContext } from "react";

// Dormant placeholder: add the auth provider SDK and session lifecycle when
// authentication is ready to be implemented. This file is not mounted by App.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // TODO: initialize the provider session, subscribe to auth changes, and expose
  // { user, status, signIn, signUp, signOut } through this context.
  const value = {
    user: null,
    status: "loading",
    signIn: async () => {
      throw new Error("Authentication is not configured yet.");
    },
    signUp: async () => {
      throw new Error("Authentication is not configured yet.");
    },
    signOut: async () => {
      throw new Error("Authentication is not configured yet.");
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
