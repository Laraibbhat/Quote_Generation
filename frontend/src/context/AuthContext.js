import { createContext, useContext, useEffect, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user authentication state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user session data when app loads
    fetch("http://localhost:8080/auth/login/success", {
      credentials: "include", // Important: Send stored session cookie
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user); // Store user info in state
        }
      })
      .catch(() => setUser(null)) // If error, assume user is not logged in
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth state
export const useAuth = () => useContext(AuthContext);
