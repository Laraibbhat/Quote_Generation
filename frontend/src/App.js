import React from "react";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import AllRoutes from "./routes/AllRoutes";
import loginBg from "./assest/images/login.jpg";

const App = () => {
  return (
    <AuthProvider>
      <div
        sx={{
          backgroundImage: `url(${loginBg})`,
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <AllRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
