import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './LoginForm.module.css';
import Textstyles from './LabelTextInput.module.css';
import {useNavigate} from 'react-router-dom'
import { AuthenticateUser } from '../../utils/UserData';
import backendIP from '../../utils/serverData';

export default function LoginForm(){   
    
    const [clientId, setClientId] = useState("");
    const [password, setpassword] = useState("");   
    const [message, setMessage] = useState("");


    useEffect(()=>{
        console.log({"api-endpoint" : backendIP});
        console.log({"allotedport2" : window.location.port});
    }, [])


    const navigate = useNavigate();

    function handleClientIdChange(e){        
        setClientId(e.target.value);
    }

    function handlePasswordChange(e){
        setpassword(e.target.value);
    }

    function handleClick(e){       
        AuthenticateUser(clientId, password, data=>{
            if(data!=="")
            {
                if(data.response === "success")
                {
                    localStorage.setItem("loginCred", clientId);
                    navigate("/homepage");
                }
                else
                    setMessage(pv=>"Invalid ClientId/Password");
            }
        });
        
     }
   

    return(       
            <div className={styles.container}>
                <div>
                    <div className={Textstyles.container}>
                        <label htmlFor="clientId" className={Textstyles.inputLabel}>Client Id</label>
                        <input 
                        type='text'
                        className={Textstyles.inputText}
                        id = "clientId"
                        name = "clientId"
                        value = {clientId} 
                        onChange={handleClientIdChange}                                                    
                        />                                    
                    </div>
                    <div className={Textstyles.container}>
                        <label htmlFor="password" className={Textstyles.inputLabel}>Password</label>
                        <input 
                        type='password'
                        className={Textstyles.inputText}
                        id = "password"
                        name = "password"
                        value = {password} 
                        onChange={handlePasswordChange}
                        />                        
                    </div>                                          
                </div>
                <button className={styles.button} onClick={handleClick}>Login</button>
                {
                    message!==""?
                    (
                        <div className={styles.message}>{message}</div>
                    ):null                    
                }            
            </div>
    )
}
