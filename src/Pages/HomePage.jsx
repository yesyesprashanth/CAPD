import React, { useEffect } from 'react';
import Layout from '../components/Layout/HomePage/Layout';
import Body from '../components/Layout/HomePage/Body';

export default function Homepage(){
    
    useEffect(()=>{
        function CheckLoginCred(){
            const data = localStorage.getItem("loginCred");
            if(data===null)
                console.log("redirect back to login page");
            else 
                console.log(data);
        }

        CheckLoginCred();
    }, [])

    return(
        <Layout>
            <Body />
        </Layout>
    )
}