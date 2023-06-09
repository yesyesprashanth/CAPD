import styles from './Layout.module.css';
import Heading from './Heading';
import Login from './Login';

export default function Layout(){
    return(
        <div className={styles.lpBody}>
            <Heading />
            <Login />
        </div>
    )
}