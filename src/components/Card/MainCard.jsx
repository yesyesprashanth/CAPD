import styles from './MainCard.module.css'

export default function MainCard({cardname, handleClick}){

 
    return(
        <>
        <div className = {styles.container} id = {cardname} onClick={handleClick}>            
            {cardname}            
        </div>
        </>
    )
}