import React from 'react';
import Layout from '../components/Layout/HomePage/Layout';
import HomeComponent from '../components/Layout/ClientHome/Homepage'

export default function Homepage(){
    
    // useEffect(()=>{
    //     function CheckLoginCred(){
    //         const data = localStorage.getItem("loginCred");
    //     }
    //     CheckLoginCred();
    // }, [])

    return(
        <Layout>
            <HomeComponent />
        </Layout>
    )
}