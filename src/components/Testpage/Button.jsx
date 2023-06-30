import React from "react";
import styles from './Button.module.css'

export default function Button({id, name, handleClick, bgColor}){
    return(
        <div className={styles.container}>
            <button id = {id} onClick={handleClick} style={{backgroundColor: bgColor}}>{name}</button>
        </div>
    )
}