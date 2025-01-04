import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Auth from "./auth/Auth";
import Home from "./pages/Home";
import Register from "./auth/Register";
import { SignedOut, SignedIn } from "@clerk/clerk-react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </SignedIn>
              <SignedOut>
                <Navigate to="/auth" replace />
              </SignedOut>
            </>
          }

        />
      </Routes>
    </Router>
  );
};

export default App;


{/* 

// <Routes>
//         <SignedIn>
//           <Route path="/" element={<Home />} />
//           <Route path="/auth" element={<Auth />} />
//           <Route path="/auth/login" element={<Login />} />
//           <Route path="/auth/register" element={<Register />} />
//         </SignedIn>
//       </Routes>

//       <Routes>
//         <SignedOut>
//           <Navigate to="/auth" replace />
//         </SignedOut>
//       </Routes> */}