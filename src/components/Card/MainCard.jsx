import styles from './MainCard.module.css'

export default function MainCard({cardname, handleClick, folderName}){

 
    return(
        <>
        <div className = {styles.container} id = {cardname} data-foldername = {folderName} onClick={handleClick}>            
            {cardname}            
        </div>
        </>
    )
}