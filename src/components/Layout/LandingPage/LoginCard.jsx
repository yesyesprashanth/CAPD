import React from 'react';
import styles from './LoginCard.module.css'
import LoginForm from '../../Form/LoginForm';

export default function LoginCard(){
    return(
        <div className = {styles.container}>
            <div className={styles.heading}>Login</div>
            <div className={styles.loginForm}>
                <LoginForm/>                
            </div>
        </div>
    )
}