import styles from './Instruction.module.css';
import React, {useContext} from 'react';
import TestContext from '../../../store/testContextProvider';
import {useNavigate} from 'react-router-dom';

export default function Index(){
    const navigate = useNavigate();
    const {instruction, testData} = useContext(TestContext);
                              
    function handleClick(e){           
        e.preventDefault();
        console.log("Instruction-Page TestData", testData);
        if(testData.testCode < 5)
            navigate('/auditory-testpage')       
        else{
            if(testData.testCode===5 ||testData.testCode===6)
                navigate('/matrixspan');           
            else
                navigate('/rowspan');
        }        
    }

    function handleBack(e){
        e.preventDefault();
        navigate('/homepage')
    }

    const exampleList = instruction.example.split("|");
    
    return (
        <div className = {styles.container}>
            <div className = {styles.title}> Instruction </div>
            <div className = {styles.body}>
                <div className={styles.instruction}>
                    {instruction.instruction}
                </div>
                {
                    exampleList.length<1?(
                        instruction.example!==""?(
                            <div className={styles.example}>
                                {instruction.example}
                            </div>                        
                        ):null         
                    ):(
                        instruction.example!==""?(
                            <div className={styles.example}>
                                <div>{exampleList[0]}</div>
                                <div>{exampleList[1]}</div>
                            </div>                 
                       ):null  
                    )
                }   
            </div>

            <div className = {styles.buttonContainer}>               
                <button className={styles.button} onClick = {e=>handleBack(e)}>Back</button>
                <button className={styles.button} onClick = {e=>handleClick(e)}>Test</button>
            </div>
        </div>
    );
}