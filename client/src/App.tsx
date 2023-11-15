import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/tasks"
          element={
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          }
        />
        <Route
          path="/add-task"
          element={
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          }
        />
        <Route
          path="/profile"
          element={
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
