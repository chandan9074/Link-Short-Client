import React, { useState } from 'react';
import axios from 'axios';

import Login from './login';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [isSignup, setIsSignup] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [passMatch, setPassMatch] = useState(false)

    const hendleSignup=(e)=>{
        e.preventDefault();
        var f_name = document.getElementById('f_name').value;
        var l_name = document.getElementById('l_name').value;
        var username = document.getElementById('u_name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('pass').value;
        var v_password = document.getElementById('v_pass').value;

        if(password===v_password){

            setPassMatch(false)

            const postSignupData=()=>{
                var signupData = {
                    first_name : f_name,
                    last_name : l_name,
                    username: username,
                    email: email, 
                    password:password
                }
                var config={
                    headers:{'Content-Type':'application/json'}
                }
                axios.post('https://link-short-url.herokuapp.com/accounts_api/signup/', signupData, config).then(response=> {
                    setIsSignup(true)
                    setIncorrect(false)
                })
                .catch(function(error){
                    setIncorrect(true)
                })
            }
            postSignupData();
        }
        else{
            setPassMatch(true)
            setIncorrect(false)
        }
    }

    const clickLogin = () =>{
        setIsSignup(true)
    }

    return ( 
        <div>
            {isSignup?<Login />: <div className="sign_car_pos">
                <div className="sign_card">
                    <p className="signup_title">Signup</p>
                    <div>
                        <input type="text" id="f_name" placeholder="First Name" />
                        <input type="text" id="l_name" placeholder="Last Name" />
                    </div>
                    <input type="text" className="u_e_p_vp_name" id="u_name" placeholder="Username"/>
                    <input type="email" className="u_e_p_vp_name" id="email" placeholder="Email"/>
                    <input type="password" className="u_e_p_vp_name" id="pass" placeholder="Password"/>
                    <input type="password" className="u_e_p_vp_name" id="v_pass" placeholder="rewrite Password"/>
                    {incorrect?<div class="alert alert-warning" role="alert" style={{marginBottom:"0",alignSelf:"center", marginTop:"2vh" , height:"4vh", width:"30vh", fontSize:"1.5vh", padding:"1vh", textAlign:"center"}}>
                                    Fillup all the information properly
                                    </div>:null}
                    {passMatch?<div class="alert alert-warning" role="alert" style={{marginBottom:"0",alignSelf:"center", marginTop:"2vh" , height:"4vh", width:"30vh", fontSize:"1.5vh", padding:"1vh", textAlign:"center"}}>
                                    Invalid password
                                    </div>:null}
                    <button onClick={hendleSignup} className="signup_btn">Signup</button>
                    <p className="log_text">You have already registered? <span onClick={clickLogin} style={{color:"salmon", cursor:"pointer"}}>Login</span> </p>
                </div>
            </div>}
        </div>
     );
}
 
export default Signup;