import React from "react";
import styles from './Layout.module.css';
import Navbar from "./Navbar";

export default function Layout(){
    return(
        <>
            <div className={styles.layout}>
                <Navbar />
                CAPD homepage
            </div>
        </>
    )
}