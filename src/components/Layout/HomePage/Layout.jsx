import React from "react";
import styles from './Layout.module.css';
import Navbar from "./Navbar";

export default function Layout({children}){
    return(
        <>
            <div className={styles.layout}>
                <Navbar />
                <div className = {styles.body}>
                    {children}
                </div>
            </div>
        </>
    )
}