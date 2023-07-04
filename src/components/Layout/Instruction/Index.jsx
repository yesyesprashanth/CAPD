import styles from './Instruction.module.css';
import React, {useContext} from 'react';
import TestContext from '../../../store/testContextProvider';
import {useNavigate} from 'react-router-dom';

export default function Index(){
    const navigate = useNavigate();
    const {instruction, example} = useContext(TestContext);
                               
    function handleClick(e){
        e.preventDefault();
        navigate('/auditory-testpage')
    }

    const exampleList = example.split("|");
    console.log(exampleList.length);

    return (
        <div className = {styles.container}>
            <div className = {styles.title}> Instruction </div>
            <div className = {styles.body}>
                <div className={styles.instruction}>
                    {instruction}
                </div>
                {
                    exampleList.length<1?(
                        example!=""?(
                            <div className={styles.example}>
                                {example}
                            </div>                        
                        ):null         
                    ):(
                        example!=""?(
                            <div className={styles.example}>
                                <div>{exampleList[0]}</div>
                                <div>{exampleList[1]}</div>
                            </div>                 
                       ):null  
                    )
                }   
            </div>

            <div className = {styles.buttonContainer}>
                <button className={styles.button} onClick = {handleClick}>Test</button>
            </div>
        </div>
    );
}