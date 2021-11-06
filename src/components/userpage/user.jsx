import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './user_page.css';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import logout from './../../pictures/logout.jpg';
import not_f from './../../pictures/not_f.png';
import copy from './../../pictures/copy.png'

const Userpage = (props) => {

    const [url, setUrl] = useState("")
    const [isupdate, setIsupdate] = useState(false)
    const [data, setData] = useState("")
    const [urlList, setUrlList] = useState([])
    const [hanDelete, setHanDelete] = useState("")
    const [blank, setBlank] = useState(false)
    const [updateVisi, setUpdateVisi] = useState(false)
    const [shortVisi, setShortVisi] = useState(false)
    const [cktitle, setCktitle] = useState(false)
    const [ckuname, setCkuname] = useState(false)
    const [checkCopy, setCheckCopy] = useState(false);


    useEffect(()=>{

        const fatch = () =>{
            
            var user = props.location.state.token.user_id;
            var config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${props.location.state.token.token}`
                }
            }
            axios.get(`https://link-short-url.herokuapp.com/url_api/user_url_list/${user}/`, config).then(response=>{
                setUrlList(response.data)
            })
        }

        fatch();
    }, [url, hanDelete])

    const saveUrl = () =>{

        setBlank(true);

        var input = document.getElementById('url_inpt').value;
        var title = document.getElementById('title_inpt').value;

        if(title!=="" && input!==""){
            setCktitle(false)
            const postUrl = () =>{
                var url_data = {
                    given_link:input,
                    title:title,
                    user_profile:props.location.state.token.user_id
                }
                var config={
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Token ${props.location.state.token.token}`
                    }
                }

                axios.post('https://link-short-url.herokuapp.com/url_api/create_user_link/', url_data, config).then(response=>{
                    setUrl("https://link-short-url.herokuapp.com/"+response.data.short_link+"/")
                    setData(response.data)
                    setUpdateVisi(true)
                    setCkuname(false)
                    setCheckCopy(true)
                })
                .catch(function(error){
                    setCkuname(true)
                })
            }

            postUrl();
        }
        else{
            setCkuname(false)
            setCktitle(true)
        }
    }

    const handleupdate = () =>{
        setIsupdate(true)
        setUpdateVisi(false)
        setShortVisi(true)
    }

    const handleUpdateSave = () =>{

        var input = document.getElementById('up_inpt').value;
        
        const postUrl = () =>{
            var url_data = {
                short_link:input,
            }
            var config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${props.location.state.token.token}`
                }
            }

            axios.put(`https://link-short-url.herokuapp.com/url_api/edit_user_link/${data.id}/`, url_data, config).then(response=>{
                setUrl("https://link-short-url.herokuapp.com/"+response.data.short_link+"/")
                setUpdateVisi(true)
                setShortVisi(false)
                handleIsupdate()
            })
        }
        postUrl();
    }

    const handleIsupdate =()=>{
        setIsupdate(false)
    }

    const handleDelete  = (value) =>{
        document.getElementById('url_opt').value="";
        document.getElementById('url_inpt').value="";
        document.getElementById('title_inpt').value="";
        setUpdateVisi(false)
        setCheckCopy(false)
        setData([]);
        setUrl("");

        const delUrl = () =>{
            
            var config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${props.location.state.token.token}`
                }
            }

            axios.delete(`https://link-short-url.herokuapp.com/url_api/delete_user_link/${value}/`, config).then(response=>{
                setHanDelete(value)
            })
        }
        delUrl();
    }

    const handleBlank = () =>{
        if(blank===true){
            document.getElementById('url_inpt').value = "";
            document.getElementById('title_inpt').value = "";
            setBlank(false)
        }
    }

    return ( 
        <div className="user_home_style ">
            <div className="user_left_style">
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
                <div className="user_url_card_style">
                    <h3 className="user_url_card_title_style">Short Your Link Here</h3>
                    <div className="user_url_short_card_style">
                        <input type="text" name="" onClick={handleBlank} id="title_inpt" className="title_ipt_box_style" placeholder="Write your Title"/>
                    
                        <input type="text" name="" onClick={handleBlank} id="url_inpt" className="user_url_ipt_box_style" placeholder="Write your URL"/>
                        {cktitle?<div class="alert alert-warning" role="alert" style={{marginBottom:"1vh", alignSelf:"center" , height:"4vh", width:"30vh", fontSize:"1.5vh", padding:"1vh", textAlign:"center"}}>
                            Fillup all the fields properly
                            </div>:null}
                        {ckuname?<div class="alert alert-warning" role="alert" style={{marginBottom:"1vh", alignSelf:"center" , height:"4vh", width:"30vh", fontSize:"1.5vh", padding:"1vh", textAlign:"center"}}>
                            This Title already exists
                            </div>:null}
                        {shortVisi?<button onClick={saveUrl} className="user_short_btn_style" disabled >Short</button>:<button onClick={saveUrl} className="user_short_btn_style" >Short</button>}
                    </div>

                    {isupdate? <input id="up_inpt" className="user_url_output_box_style" defaultValue={data.short_link} />:null}

                    {!isupdate?<div className="url_copy" style={{alignSelf:"center"}}><input type="text" id="url_opt" value={url} className="url_output_box_style" placeholder="Your short URL will be here!!" readOnly/>
                    {checkCopy?<CopyToClipboard text={url}>
                            <img className="copy_img" src={copy} alt="copy.." title="Copy" />
                        </CopyToClipboard>:null}</div>:null}

                    { updateVisi? <button onClick={handleupdate} className="update_btn" >Update</button>:null}
                    {isupdate?<button onClick={handleUpdateSave} className="save_btn" >Save</button>:null}
                </div>
                
            </div>
            <div className="part1"></div>
            <div className="part2"></div>
            <div className="part3"></div>
            <div className="user_right_style">
                <div className="u_l_pos">
                    <h4 className="user_title_name">Hello, {props.location.state.token.username}</h4>
                    <a className="logout_hrf" href="/"><img className="logout_img" src={logout} alt="logout.." title="Logout" /></a>
                </div>
                <table className="table_style">
                    <thead className="thead_block">
                    <tr>
                        <th className="table_head head_border1">Title</th>
                        <th className="table_head  head_border2">Short Link</th>
                        <th className="table_head head_border3  ">Action</th>
                    </tr>
                    </thead>
                    
                    {urlList.length!==0?<tbody className="tbody_scroll">{urlList.map(list =>(
                        <tr className="bg_color">
                            <td className="table_data1">{list.title}</td>
                            <td className="table_data2">http://localhost:3000/{list.short_link}/</td>
                            <td className="table_data3"><button className="del_btn" onClick={()=>handleDelete(list.id)} >Delete</button></td>
                        </tr>
                    ))}</tbody>:<tr><td style={{textAlign:"center"}}> <img style={{width:"14vh", height:"14vh"}} src={not_f} alt="not found"/> </td></tr>}
                </table>
            </div>
        </div>
     );
}
 
export default Userpage;