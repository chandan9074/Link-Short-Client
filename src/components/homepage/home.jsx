import React, { useState } from 'react';
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './homeStyle.css';

import Login from './login';
import arrow from './../../pictures/arrow_f.png'
import check from './../../pictures/check.png'
import copy from './../../pictures/copy.png'


const Home = () => {

    const [url, setUrl] = useState("");
    const [checkCopy, setCheckCopy] = useState(false);

    const saveUrl = () =>{
        var input = document.getElementById('url_inpt').value;
        
        const postUrl = () =>{
            var url_data = {
                given_link:input
            }
            var config={
                headers:{'Content-Type':'application/json'}
            }
            axios.post('https://link-short-url.herokuapp.com/url_api/create_public_link/', url_data, config).then(response=>{
                setUrl("https://link-short-url.herokuapp.com/"+response.data.short_link+"/")
                setCheckCopy(true)
            })
        }
        postUrl();

    }

    return ( 
        <div className="home_style">
            <div className="left_side">
                <h3 className="title_style">L
                                        <span style={{fontSize:"4vh"}}>I</span>
                                        <span style={{fontSize:"4vh"}}>N</span>
                                        <span style={{fontSize:"4vh"}}>K</span>
                                        <span style={{fontSize:"4vh"}}>S</span>
                                        <span style={{fontSize:"4vh"}}>H</span>
                                        <span style={{fontSize:"4vh"}}>O</span>
                                        <span style={{fontSize:"4vh"}}>R</span>
                                        T</h3>
                <div className="under_line" ></div>
                <h4 className="sub_title_style" >MAKE YOUR URL EASY</h4>
                <div className="url_card_style">
                    <h3 className="url_card_title_style">Short Your Link Here</h3>
                    <div className="box_position">
                        <input id="url_inpt" className="url_ipt_box_style" placeholder="Write your URL" />
                        <button className="short_btn_style" onClick={saveUrl} >Short</button>
                    </div>
                    <div className="url_copy">
                        <input type="text" value={url} className="url_output_box_style" placeholder="Your short URL will be here!!" readOnly/>
                        {checkCopy?<CopyToClipboard text={url}>
                            <img className="copy_img" src={copy} alt="copy.." title="Copy"/>
                        </CopyToClipboard>:null}   
                    </div>
                </div>
            </div>
            <div className="part1"></div>
            <div className="part2"></div>
            <div className="part3"></div>
            <div className="right_side">
                <div className="details">
                    <div className="faci_title" > <img src={arrow} alt="arrow.." style={{width:"5vh", height:"4.5vh"}} /> Facilities of a registered user</div>
                    <div className="faci_1"> <img src={check} alt="arrow.." style={{width:"3.5vh", height:"3.5vh"}} />  Create Unlimited short link</div>
                    <div className="faci_2"> <img src={check} alt="arrow.." style={{width:"3.55vh", height:"3.5vh"}} /> Edit link</div>
                    <div className="faci_3"> <img src={check} alt="arrow.." style={{width:"3.5vh", height:"3.5vh"}} /> Save link</div>
                </div>
                <Login />
            </div>
        </div>
     );
}
 
export default Home;