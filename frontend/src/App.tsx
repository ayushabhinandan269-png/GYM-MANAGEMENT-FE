import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
