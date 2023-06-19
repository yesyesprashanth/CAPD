import styles from './Layout.module.css';
import Heading from './Heading';
import LoginCard from './LoginCard';

export default function Layout(){
    return(
        <div className={styles.lpBody}>
            <Heading />
            <LoginCard />
        </div>
    )
}