import { resetPassword } from "../ApiRequests/AxiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// CSS 

import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/Login-Form-Clean.css";
import "../assets/fonts/ionicons.min.css";
import "../assets/css/styles.css";

export default function ResetPassword() {
    
    const { email } = useSelector(state => state.getEmail);     
    const isLoggedIn = useSelector(state => state.isLoggedIn);     

    const navigate = useNavigate();
    const dispatch = useDispatch();        
        
    const [otp, setOtp] = useState("");      
    const [password, setPassword] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState("");     

    useEffect(() => {

        if (isLoggedIn.userLogin) {

            navigate('/profile');
        }        
    },[])    

    function onSubmit(e) {
        
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not Match !");
        }
        else {

            resetPassword(
                email, 
                otp, 
                password, 
                confirmPassword).then(function(result) {
            
                console.log(result);
    
                if (result[0] === 200) {
    
                    console.log("SUCCESS >> NAVIGATING TO LOGIN PAGE");                
                    navigate('/');                                                                                                          
                }            
                else {
                    alert(result[1].message);                    
                }                          
            });
        }                         
    }                                    
    

    return (             
        <>               
        <section className="login-clean">
            <form onSubmit={onSubmit}>
                <h2 className="visually-hidden">Reset Password</h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"></i>
                </div>
                <div className="form-group mb-3">
                    <input 
                        className="form-control"                        
                        type="email" 
                        name="email"
                        value={email} 
                        disabled={true}
                        placeholder="Email"
                        required>
                    </input>
                </div>  
                <div className="form-group mb-3">
                    <input 
                        className="form-control"
                        onChange={(e) => setOtp(e.target.value)} 
                        type="text" 
                        name="otp"                    
                        placeholder="Code"
                        required>
                    </input>
                </div>                
                <div className="form-group mb-3">
                    <input 
                        className="form-control" 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        required
                        minLength={'8'}>

                    </input>
                </div>
                <div className="form-group mb-3">
                    <input 
                        className="form-control" 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        type="password" 
                        name="password" 
                        placeholder="Confirm Password"
                        required
                        minLength={'8'}>
                    </input>
                </div>                                
                <div className="form-group mb-3">
                <button 
                    className="btn btn-primary d-block w-100" 
                    type="submit">
                    Reset
                </button>
                </div>                
                <hr/>      
                <a className="forgot" href="/">Login Instead</a>                          
            </form>            
        </section>        
        </>
    );    
}
