import styles from './SubCard.module.css';
export default function SubCard({heading, subheading, handleClick, instruction, example}){    
    return(     
            <div className = {styles.container} id = {heading} data-instruction = {instruction} data-example = {example} onClick={handleClick}>
                <div className = {styles.heading} id = {heading} data-instruction = {instruction} data-example = {example}>{heading}</div>
                {
                    subheading!==""?(<div className = {styles.subheading} data-instruction = {instruction} data-example = {example} id = {heading} >{subheading}</div>):null
                }
            </div>       
    )
}