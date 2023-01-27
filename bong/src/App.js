import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Register from "./Auth/Register";
import Profile from "./pages/Profile";
import SignIn from "./Auth/SignIn";

function App() {    

  return (
    
    <Routes>            
      <Route path='/' element={ <SignIn /> } />
      <Route path='forgot-password' element={ <ForgotPassword /> } />      
      <Route path='reset-password' element={ <ResetPassword /> } />    
      <Route path='register' element={ <Register /> } />      
      <Route path='profile' element={ <Profile /> } />
    </Routes>
  );
}

export default App;
