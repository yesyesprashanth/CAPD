import { useState } from 'react';
import styles from './Body.module.css';
import MainCard from '../../Card/MainCard';
import SubCard from '../../Card/SubCard';
export default function Body(){    
    const [cardType, setCardType] = useState(true);
    const [level, setLevel] = useState(true);

    const CardList = ["Auditory","Cognitive"];
    const subCardList = [{heading:"1.1 Vowels", subheading:"hunt the vowel"}, {heading:"1.2 Consonants", subheading:"pick the consonants"}, {heading:"1.3 Phoneme", subheading:"tell the phoneme"}];
    const subLevleList = [{heading:"Easy", subheading:""}, {heading:"Medium", subheading:""}, {heading:"Very easy", subheading:""}, {heading:"Difficult", subheading:""}]

    function handleCardClick(){
        setCardType(pv=>!cardType);
        if(cardType)
            setLevel(pv=>true)
    }

    function handleSubCardClick(){
        setLevel(!level);
    }
    
    return(
        <div className = {styles.container}>
            {
             cardType?(<div className = {styles.moduelContainer}>
                {
                    CardList.map((card)=>{
                        return <MainCard key = {card} cardname = {card} handleClick = {handleCardClick} />
                    })
                }            
                </div>):(
                <div className={styles.chaptersContainer}>
                    {
                        level?(
                            subCardList.map(card=>{
                                return <SubCard heading={card.heading} subheading={card.subheading} handleClick = {handleSubCardClick}/>
                            })
                        ):(
                            subLevleList.map(card=>{
                                return <SubCard heading={card.heading} subheading={card.subheading} handleClick = {handleSubCardClick}/>
                            })
                        )
                    }
                </div>
            )
            }
        </div>
    )
}