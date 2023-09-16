import styles from './SubCard.module.css';
export default function SubCard({heading, subheading, handleClick, instruction, example, folderName}){        
    return(     
            <div className = {styles.container} id = {heading} data-instruction = {instruction} data-example = {example} data-foldername = {folderName} onClick={handleClick}>
                <div className = {styles.heading} id = {heading} data-instruction = {instruction} data-example = {example} data-foldername = {folderName}>{heading}</div>
                {
                    subheading!==""?(<div className = {styles.subheading} data-instruction = {instruction} data-example = {example} data-foldername = {folderName} id = {heading} >{subheading}</div>):null
                }
            </div>       
    )
}