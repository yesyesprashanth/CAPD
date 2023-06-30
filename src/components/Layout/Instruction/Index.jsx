import styles from './Instruction.module.css';
import React, {useContext} from 'react';
import TestContext from '../../../store/testContextProvider';
import {useNavigate} from 'react-router-dom';

export default function Index(){
    const navigate = useNavigate();
    const {instruction} = useContext(TestContext);
                               
    function handleClick(e){
        e.preventDefault();
        navigate('/auditory-testpage')
    }

    return (
        <div className = {styles.container}>
            <div className = {styles.title}> Instruction </div>
            <div className = {styles.body}>
                {instruction}
            </div>
            <div className = {styles.buttonContainer}>
                <button className={styles.button} onClick = {handleClick}>Test</button>
            </div>
        </div>
    );
}