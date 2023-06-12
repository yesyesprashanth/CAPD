import React, { useEffect } from 'react';

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
        <div>Home page</div>
    )
}