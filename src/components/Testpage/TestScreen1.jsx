import React, { useState, useContext, useEffect } from 'react';
import styles from './TestScreen1.module.css'
import Button from './Button';
import audioIcon from '../../assets/Audio_Icon.png'
import TestContext from '../../store/testContextProvider';
import lion from '../../assets/lion.jpg';
import parrot from '../../assets/parrot.jpg';
import butterfly from '../../assets/butterfly.jpg';

export default function TestScreen1(){
    const {testCode, instruction} = useContext(TestContext);
    const [buttonData, setButtonData] = useState({
        name1:"Correct",
        color1: "#16680E",
        name2: "Wrong",
        color2: "#730D0D"
    })
    
    const buttonDataList = [
        {
            name1:"Correct",
            color1: "#16680E",
            name2 : "Wrong",
            color2: "#730D0D"
        },
        {
            name1:"Same",
            color1: "#ACA8EE",
            name2 : "Different",
            color2: "#ACA8EE"
        },
    ]

    useEffect(()=>{
        function setButton(){
            if(testCode===1 || testCode===3 || testCode===4){
                setButtonData(pv=>({
                    ...pv, name1: buttonDataList[0].name1, color1: buttonDataList[0].color1, name2: buttonDataList[0].name2, color2: buttonDataList[0].color2
                }))
            }else{
                setButtonData(pv=>({
                    ...pv, name1: buttonDataList[1].name1, color1: buttonDataList[1].color1, name2: buttonDataList[1].name2, color2: buttonDataList[1].color2
                }))                
            }                
        }

        setButton();
    }, [testCode]);
    
    
    

    function content(){
        switch(testCode){
            case 1:               
                return(
                    <img src={audioIcon} alt='audio icon' />          
                )
            break;
            case 2:
              
                return(                    
                    <img src={audioIcon} alt='audio icon' />      
                    
                )
            break;
            case 3:         
                return(
                    <div>
                        <img src = {lion} alt="image1" />
                        <img src = {parrot} alt="image2" />
                        <img src = {butterfly} alt="image3" />
                    </div>
                )
            break;
            case 4:           
            return(
                    <div>
                        <button>4</button>
                        <button>2</button>
                        <button>0</button>
                        <button>-2</button>
                        <button>-4</button>
                    </div>
                )   
            break;
        }        
    }


    return(
        <div className={styles.container}>
            <div className={styles.instruction}>{instruction}</div>
            <div className={styles.content}>
            {
                content()
            }
            </div>
            <div className={styles.responseButton}>
                <Button id="btn1" name = {buttonData.name1} bgColor= {buttonData.color1} />
                <Button id="btn2" name = {buttonData.name2}  bgColor={buttonData.color2} /> 
            </div>
            <div className={styles.commonButtons}>
                <Button id="repeat" name = "Repeat" bgColor="#ACA8EE" />
                <Button id="exit" name = "Exit" bgColor="#ACA8EE" />                
            </div>            
        </div>
    )
}
