import { useState } from 'react';
import styles from './Body.module.css';
import MainCard from '../../Card/MainCard';
import SubCard from '../../Card/SubCard';
import {getModuleList, getObject} from '../../../utils/ModuleStructure.js'
export default function Body(){        
    const [module, setModule] = useState("");
    const [chapter, setChapter] = useState("");
    const [subChapter, setSubChapter] = useState("");
    const [level, setLevel] = useState(0);
    const [subCardList, setSubCardList] = useState([]);

    const CardList = getModuleList();     

    function handleCardClick(e){        
        setModule(pv=>e.target.id);                
        const moduleObject = getObject(e.target.id, "", "");
        // console.log("module is clicked")
        setSubCardList(pv=>moduleObject.items);      
        setLevel(pv=>pv+1)          
    }

    function handleSubCardClick(e){
        console.log(e.target.id);
        let itemObject;
        switch(level){
            case 1:
                setChapter(e.target.id);
                // console.log("chapter is clicked");
                itemObject = getObject(module, e.target.id, "");
                break;
            case 2:
                setSubChapter(e.target.id);
                // console.log("subchapter is clicked");
                itemObject = getObject(module, chapter, e.target.id);
                break;
            default:
                level=3;
        }
        setLevel(pv=>pv+1)                       
        // console.log("subCard", itemObject.items);
        setSubCardList(pv=>itemObject.items);      
    }
    
    return(
        <div className = {styles.container}>
            {
             level===0?(<div className = {styles.moduelContainer}>
                {
                    CardList.map((card)=>{                     
                        return <MainCard key = {card} cardname = {card} handleClick = {handleCardClick} />
                    })
                }            
                </div>):(
                <div className={styles.chaptersContainer}>
                    {                        
                        subCardList.map(card=>{
                            return <SubCard heading={card.title} key = {card.title}  subheading={card.subTitle} handleClick = {handleSubCardClick}/>
                        }) 
                    }
                </div>
            )
            }
        </div>
    )
}