import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext";
import { AppRouter } from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
