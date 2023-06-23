import styles from './MainCard.module.css'

export default function MainCard({cardname, handleClick}){

 
    return(
        <div className = {styles.container} onClick={handleClick}>
            <div>
                {cardname}
            </div>
        </div>
    )
}