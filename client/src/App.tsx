import { Route, Routes } from "react-router-dom";
import { Home, Login, Profile, Register, Task, TaskForm, Tasks } from "./pages";
import AuthProvider from "./context/AuthContext";
import { ProtectedRoutes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/tasks"
            element={<Tasks />}
          />
          <Route
            path="/add-task"
            element={<TaskForm />}
          />
          <Route
            path="/tasks/:id"
            element={<Task />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
