import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Auth from "./auth/Auth";
import Page1 from "./User pages/Page1";
import Register from "./auth/Register";
import Page2 from './User pages/Page2'
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import Dashbored from "./User pages/Dashbored";
import Main from "./Customer Pages/Main"
import Shop from "./Customer Pages/Shop"

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
                  <Route path="/" element={<Page1 />} />
                  <Route path="/Page2" element={<Page2 />} />
                  <Route path="/Dashbored" element={<Dashbored />} />

                  {/* customer */}
                  <Route path="customer/main" element={<Main />} />
                  <Route path="/shop/:shopName" element={<Shop />} />




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