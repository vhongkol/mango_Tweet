import { setUserEmail } from "../redux/getEmailForgotPassword";
import { sendCodeForgotPassword } from "../ApiRequests/AxiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// CSS 

import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/Login-Form-Clean.css";
import "../assets/fonts/ionicons.min.css";
import "../assets/css/styles.css";

export default function ForgotPassword() {
    
    const isLoggedIn = useSelector(state => state.isLoggedIn);     
    const dispatch = useDispatch();
    const navigate = useNavigate();       
    const [email, setEmail] = useState("");      
    
    useEffect(() => {

        if (isLoggedIn.userLogin) {

            navigate('/profile');
        }        
    },[])    

    function onSubmit(e) {
        
        e.preventDefault();                
        console.log('LOADING...')        
        sendCodeForgotPassword(email).then(function(result) {
            
            console.log(result);
            dispatch(setUserEmail(email));
            if (result[0] === 200) {

                console.log("SUCCESS >> NAVIGATING TO RESET PASSWORD PAGE");                                
                navigate('/reset-password');                                                                                                          
            }
            else if (result[0] === 201) {

                alert(result[1].message);
                navigate('/reset-password');  
            }            
            else {
                alert(result[1].message);
            }                          
        });            
        
    }                             
    
    return (             
        <>               
        <section className="login-clean">
            <form onSubmit={onSubmit}>
                <h2 className="visually-hidden">Forgot Password </h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"></i>
                </div>
                <div className="form-group mb-3">
                    <input 
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        required>
                    </input>
                </div>               
                <div className="form-group mb-3">
                <button 
                    className="btn btn-primary d-block w-100" 
                    type="submit">
                    Send Code
                </button>
                </div>                
                <hr/>                                
                <a className="forgot" href="/">Login Instead</a> 
            </form>            
        </section>        
        </>
    );    
}
