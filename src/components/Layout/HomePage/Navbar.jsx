import styles from './Navbar.module.css'
import appLogo from '../../../assets/Earlogo.png';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import TestContext from '../../../store/testContextProvider';

export default function Navbar(){
    const navigate = useNavigate();
    const {testData} = useContext(TestContext);

    function handleClick(e){        
        e.preventDefault();
        resetValues();
        const path = '/homepage'
        navigate(path)
    }

    function handleSignOut(e){
        e.preventDefault();
        resetValues();
        navigate("/");
    }

    function resetValues(){
        testData.updateModule(pv=>"");
        testData.updateChapter(pv=>"");
        testData.updateSubChapter(pv=>"");
        testData.updateLevel(pv=>0)
    }

    return( 
        <>
            <div className = {styles.container}>
                <div className={styles.nav}>
                    <div className = {styles.logo}>
                        <img src={appLogo} alt ='App Logo' />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button} onClick={handleClick}>Homepage</button>
                        <button type="submit" className={styles.button} onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>
            </div>
        </>
    )
}