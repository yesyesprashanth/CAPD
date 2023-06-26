import styles from './SubCard.module.css';
export default function SubCard({heading, subheading, handleClick}){    
    return(     
            <div className = {styles.container} id = {heading} onClick={handleClick}>
                <div className = {styles.heading} id = {heading}>{heading}</div>
                {
                    subheading!==""?(<div className = {styles.subheading} id = {heading}>{subheading}</div>):null
                }
            </div>       
    )
}