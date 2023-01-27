import { register } from "../ApiRequests/AxiosRequests";
import { loginUser } from "../redux/isLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// CSS 

import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/Login-Form-Clean.css";
import "../assets/fonts/ionicons.min.css";
import "../assets/css/styles.css";

export default function SignIn() {
    
    const isLoggedIn = useSelector(state => state.isLoggedIn);     

    const navigate = useNavigate();
    const dispatch = useDispatch();        

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");  
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");     

    useEffect(() => {

        if (isLoggedIn.userLogin) {

            navigate('profile');
        }        
    },[])    

    function onSubmit(e) {
        
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not Match !");
        }
        else {

            registerUser();
        }                         
    }                             
    
    function registerUser() {
        
        register(
            firstname,
            lastname,
            gender,
            email,
            password,
            confirmPassword
        ).then(function(result) {

            console.log(result);
            if (result[0] === 200) {

                dispatch(loginUser(result[1].token));                
                console.log("DONE REGISTER  >> NAVIGATING TO PROFILE");                
                navigate('/profile');
            }
            else {
                alert(result[1].message);
            }
        });
    }

    function genderChange(event) {

        setGender(event.target.value);
    }

    return (             
        <>               
        <section className="login-clean">
            <form onSubmit={onSubmit}>
                <h2 className="visually-hidden">Register Form</h2>
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
                    <input 
                        className="form-control" 
                        onChange={(e) => setFirstname(e.target.value)} 
                        type="text" 
                        name="firstname" 
                        placeholder="First Name"
                        required
                        maxLength={'255'}>

                    </input>
                </div>
                <div className="form-group mb-3">
                    <input 
                        className="form-control" 
                        onChange={(e) => setLastname(e.target.value) } 
                        type="text" 
                        name="lastname" 
                        placeholder="Last Name"
                        required
                        maxLength={'255'}>

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
                    <input 
                        type="radio" 
                        name="gender" value="Male"       
                        onChange={genderChange} 
                        required
                        id="male"
                        />
                    <label htmlFor="male">Male</label>
                    <input 
                        type="radio" 
                        name="gender" value="Female"       
                        onChange={genderChange}
                        required 
                        id="female"
                        />
                    <label htmlFor="female">Female</label>
                </div>
                <div className="form-group mb-3">
                <button 
                    className="btn btn-primary d-block w-100" 
                    type="submit">
                    Register
                </button>
                </div>                
                <hr/>      
                <a className="forgot" href="/">Login Instead</a>                          
            </form>            
        </section>        
        </>
    );    
}
