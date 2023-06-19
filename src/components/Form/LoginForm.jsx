import React from 'react';
import { useState } from 'react';
import styles from './LoginForm.module.css';
import Textstyles from './LabelTextInput.module.css';

import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

export default function LoginForm(){   
    
    const [clientId, setClientId] = useState();
    const [password, setpassword] = useState();
    const [test, setTest] = useState();

    const {register, handleSubmit, formState:{errors}} = useForm();
    
    const navigate = useNavigate();

    function handleClientIdChange(e){
        setClientId(e.target.value);
    }

    function handlePasswordChange(e){
        setpassword(e.target.value);
    }

    function handeTestChange(e){
        setTest(e.target.value);
    }


    function onSubmit(data){        
        localStorage.setItem("loginCred",data);
        const path = '/homepage'
        navigate(path);
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <div>
                    <div className={Textstyles.container}>
                        <label htmlFor={clientId} className={Textstyles.inputLabel}>Client Id</label>
                        <input 
                        type='text'
                        className={Textstyles.inputText}
                        id = {clientId}
                        name = {clientId} 
                        value = {clientId} 
                        onChange={handleClientIdChange}  
                        {...register("clientId", {required:true})}                                
                        />
                         {errors.clientId && <p>Client ID is required</p>}                     
                    </div>
                    <div className={Textstyles.container}>
                        <label htmlFor={password} className={Textstyles.inputLabel}>Password</label>
                        <input 
                        type='text'
                        className={Textstyles.inputText}
                        id = {password}
                        name = {password} 
                        value = {password} 
                        onChange={handlePasswordChange}          
                        {...register("password", {required:true})}
                        /> 
                        {errors.password && <p>Password is required</p>}
                    </div>                                          
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </div>
        </form>
    )
}
