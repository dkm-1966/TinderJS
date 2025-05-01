import { RouterProvider } from "react-router";
import { router } from "./router/router";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
