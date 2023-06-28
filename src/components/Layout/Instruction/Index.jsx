import styles from './Instruction.module.css';

export default function Index(){

    const kannadaInstruction = `ಶಬ್ದಗಳಲ್ಲಿ ನೀವು ಕೇಳುವ ಸ್ವರಗಳನ್ನು ಹುಡುಕಿ ?`;
                               

    return (
        <div className = {styles.container}>
            <div className = {styles.title}> Instruction </div>
            <div className = {styles.body}>
                {kannadaInstruction}
            </div>
            <div className = {styles.buttonContainer}>
                <button className={styles.button}>Test</button>
            </div>
        </div>
    );
}