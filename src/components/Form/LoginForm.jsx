import React from 'react';
import { useState } from 'react';
import LabelTextInput from './LabelTextInput';
import styles from './LoginForm.module.css';

export default function LoginForm(){
    const [clientId, setClientId] = useState("");
    const [password, setPassword] = useState("");

    function handleClientIdChange(){
        setClientId(e.target.value);
    }

    function handlePasswordChange(){
        setClientId(e.target.value);
    }

    return(
        <div className={styles.container}>
            <div>
                <LabelTextInput 
                    label = "ClientId"
                    name = "clientId"
                    value = {clientId}
                    onChange={e=>handleClientIdChange}
                />
                <LabelTextInput 
                    label = "Password"
                    name = "password"
                    value = {clientId}
                    onChange={e=>handlePasswordChange}
                />
            </div>
            <button className={styles.button}>Login</button>
        </div>
    )
}