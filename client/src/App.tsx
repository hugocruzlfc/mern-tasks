import { Toaster } from "sonner";
import { AuthProvider, TasksProvider } from "./context";
import { AppRouter } from "./routes";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <main className="container mx-auto px-4">
          <AppRouter />
          <Toaster />
        </main>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
