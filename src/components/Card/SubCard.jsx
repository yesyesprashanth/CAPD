import styles from './SubCard.module.css';
export default function SubCard({heading, subheading, handleClick}){
    return(
        <>
            <div className = {styles.container} onClick={handleClick}>
                <div className = {styles.heading}>{heading}</div>
                {
                    subheading!=""?(<div className = {styles.subheading}>{subheading}</div>):(null)
                }
            </div>
        </>
    )
}