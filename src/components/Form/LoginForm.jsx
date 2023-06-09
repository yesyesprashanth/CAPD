import React from 'react';
import { useState } from 'react';
import LabelTextInput from './LabelTextInput';
import styles from './LoginForm.module.css';

export default function LoginForm(){
    const [clientId, setClientId] = useState("");
    const [password, setPassword] = useState("");
    const [learnInput, setLearnInput] = useState("")

    function handleClientIdChange(e){
        setClientId(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handleInputChange(e){
        setLearnInput(e.target.value);
    }

    return(
        <div className={styles.container}>
            <div>
                <LabelTextInput 
                    label = "ClientId"
                    name = "clientId"
                    value = {clientId}
                    onChange={handleClientIdChange}
                />
                <LabelTextInput 
                    label = "Password"
                    name = "password"
                    value = {password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button className={styles.button}>Login</button>
        </div>
    )
}