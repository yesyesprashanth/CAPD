import React from 'react';
import styles from './Login.module.css'
import LoginForm from '../../Form/LoginForm';

export default function Login(){
    return(
        <div className = {styles.container}>
            <div className={styles.heading}>Login</div>
            <div className={styles.loginForm}>
                <LoginForm/>                
            </div>
        </div>
    )
}