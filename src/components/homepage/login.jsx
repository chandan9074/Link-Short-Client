import React, { useState } from 'react';
import axios from 'axios';

import Singup from './signup';
import './homeStyle.css';
import {
  Redirect
} from "react-router-dom";


const Login = () => {

    const [token, setToken] = useState("");
    const [incorrect, setIncorrect] = useState(false)
    const [isLogin, setIslogin] = useState(false)
    const [cliksign, setCliksign] = useState(false)

    const hendelLogin = () =>{
        var u_name = document.getElementById('u_name').value;
        var pass = document.getElementById('pass').value;

        const postLoginData=async ()=>{ 
            var loginData = {
                username:u_name,
                password:pass
            }
            var config={
                headers:{'Content-Type':'application/json'}
            }
            axios.post('http://127.0.0.1:8000/accounts_api/login/', loginData, config).then(async response=> {
                if(response.status===200){
                    await setToken(response.data)
                    setIslogin(true)
                    setIncorrect(false)
                }
            })
            .catch(function(error){
                setIncorrect(true)
            })
        }
        postLoginData();
    }

    const clickSignup = () =>{
        setCliksign(true);
    }


    return ( 
        <div>
            {isLogin? <Redirect to={{pathname:`/dashboard/${token.username}/`, state:{token:token}}} />
             : <div>
            {cliksign? <Singup /> : <div className="log_card_dis">
            <div className="login_card">
                <p className="login_title">WELCOME</p>  
                <input className="u_name_styl" type="text" id="u_name" placeholder="Username"/>
                <input className="pass_styl" type="password" id="pass" placeholder="Password"/>
                {incorrect?<div class="alert alert-warning" role="alert" style={{marginBottom:"0", alignSelf:"center" , marginTop:"2vh" , height:"4vh", width:"30vh", fontSize:"1.5vh", padding:"1vh", textAlign:"center"}}>
                            Invalid Username or Password
                            </div>:null}
                <button className="login_btn" onClick={hendelLogin}>LOGIN</button>
                <p className="sing_text">Don't have account? <a href="" onClick={clickSignup} style={{color:"salmon", cursor:"pointer"}}>Singup</a> </p>
            </div>
            </div>}
            </div>}
        </div>
     );
}
 
export default Login;