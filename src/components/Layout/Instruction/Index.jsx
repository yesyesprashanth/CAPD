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

    return (
        <div className = {styles.container}>
            <div className = {styles.title}> Instruction </div>
            <div className = {styles.body}>
                <div className={styles.instruction}>
                    {instruction}
                </div>
                <div className={styles.example}>
                    {example}
                </div>                
            </div>

            <div className = {styles.buttonContainer}>
                <button className={styles.button} onClick = {handleClick}>Test</button>
            </div>
        </div>
    );
}