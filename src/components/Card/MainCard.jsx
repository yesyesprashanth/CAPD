import styles from './MainCard.module.css'


export default function MainCard({cardname}){
    return(
        <div className = {styles.container}>
            <div>
                {cardname}
            </div>
        </div>
    )
}