import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Route } from "react-router-dom";

const RenderURL = (props) => {

    const [url, setUrl] = useState("");

    useEffect(()=>{

        const fatch = ()=>{    
            var config={
                headers:{'Content-Type':'application/json'}
            }
            const params = props.match.params.str;
            axios.get(`https://link-short-url.herokuapp.com/url_api/render_public_url/${params}/`, config).then(response=>{
                setUrl(response.data.given_link)
            })
        }
        fatch();
    }, [url])

    return ( 
        <div>
        <div>{console.log(url)}</div>
        <Route  component={() => { 
            window.location.replace(`${url}`); 
            return null;
        }}/>
        </div>
     );
}
 
export default RenderURL;