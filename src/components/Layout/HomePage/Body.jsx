import styles from './Body.module.css';
import MainCard from '../../Card/MainCard';
export default function Body(){    
    const CardList = ["Auditory","Cognitive"];

    console.log(CardList);
    return(
        <div className = {styles.container}>
            {
                CardList.map((card)=>{
                    return <MainCard cardname = {card} />
                })
            }            
        </div>
    )
}