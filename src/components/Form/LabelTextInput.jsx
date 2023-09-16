import React from 'react';
import styles from './LabelTextInput.module.css';
import {useForm} from 'react-hook-form'

export default function LabelTextInput({label, name, value, onChange}){
    return(
        <div className={styles.container}>
            <label htmlFor={name} className={styles.inputLabel}>{label}</label>
            <input 
                type='text'
                className={styles.inputText}
                id = {name}
                name = {name} 
                value = {value} 
                onChange={onChange}                                  
                />                                  
        </div>
    )
}