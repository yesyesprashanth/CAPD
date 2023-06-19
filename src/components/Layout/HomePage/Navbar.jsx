import styles from './Navbar.module.css'
import appLogo from '../../../assets/Earlogo.png';
import {useNavigate} from 'react-router-dom';

export default function Navbar(){
    const navigiate = useNavigate();
    function handleClick(){
        navigiate('/homepage')
    }
    return(
        <>
            <div className = {styles.container}>
                <div className={styles.nav}>
                    <div className = {styles.logo}>
                        <img src={appLogo} alt ='App Logo' />
                    </div>
                    <div>
                        <button type="submit" className={styles.button} onClick={handleClick}>Homepage</button>
                    </div>
                </div>
            </div>
        </>
    )
}