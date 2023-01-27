import { login } from "../ApiRequests/AxiosRequests";
import { loginUser } from "../redux/isLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// CSS 

import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/Login-Form-Clean.css";
import "../assets/fonts/ionicons.min.css";
import "../assets/css/styles.css";

export default function SignIn() {
    
    const isLoggedIn = useSelector(state => state.isLoggedIn);     

    const navigate = useNavigate();
    const dispatch = useDispatch();        
    
    const email = useRef(null);
    const password = useRef(null);    

    useEffect(() => {

        // TODO STORE TOKEN TO LOCAL STORAGE
           
    },[])    

    function onSubmit(e) {
        
        e.preventDefault();    
        console.log("LOADING...")
        
        login(
            email.current.value,
            password.current.value)
            .then(function(result) {
            
            console.log(result);

            if (result[0] === 200) {

                console.log("SUCCESS >> NAVIGATING TO PROFILE");

                dispatch(loginUser(result[1].token));                  
                navigate('profile');                                                                                                  
            } 
            else if (result[0] >= 500)  {
                alert("Invalid Email");
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
                <h2 className="visually-hidden">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"></i>
                </div>
                <div className="form-group mb-3">
                    <input 
                        className="form-control"                                                
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        required
                        ref={email}>
                    </input>
                </div>
                <div className="form-group mb-3">
                    <input 
                        className="form-control"                         
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        required
                        minLength={'8'}
                        ref={password}>

                    </input>
                </div>
                <div className="form-group mb-3">
                <button 
                    className="btn btn-primary d-block w-100" 
                    type="submit">
                    Log In
                </button>
                </div>
                <a className="forgot" href="/forgot-password">Forgot your email or password?</a>
                <hr/>                                
                <a className="forgot" href="/register">Register an Account</a>
            </form>            
        </section>        
        </>
    );    
}
