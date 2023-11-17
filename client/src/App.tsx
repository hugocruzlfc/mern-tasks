import { Toaster } from "sonner";
import { AuthProvider, TasksProvider } from "./context";
import { AppRouter } from "./routes";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <AppRouter />
      </TasksProvider>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
