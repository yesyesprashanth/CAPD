import { useState, useEffect, useContext } from 'react';
import styles from './Homepage.module.css';
import MainCard from '../../Card/MainCard';
import SubCard from '../../Card/SubCard';
import {getModuleList, getObject} from '../../../utils/ModuleStructure.js'
import { useNavigate } from 'react-router-dom';
import TestContext from '../../../store/testContextProvider';

export default function Homepage(){        
    const [module, setModule] = useState("");
    const [chapter, setChapter] = useState("");
    const [subChapter, setSubChapter] = useState("");
    const [level, setLevel] = useState(0);    
    const [subCardList, setSubCardList] = useState([]);
    const {updateInstruction, updateTesCode, updateExample} = useContext(TestContext);

    const navigate = useNavigate();

    function handleBack(e){
        e.preventDefault();        
             
        if(level>0)
            setLevel(pv=>pv-1); 
    }
    
    const CardList = getModuleList();     
    
    function handleCardClick(e){        
        setModule(pv=>e.target.id);    
        setLevel(pv=>pv+1);            
    }

    function handleSubCardClick(e){
        const instruction = e.target.getAttribute("data-instruction");
        const example = e.target.getAttribute("data-example");
        
        // console.log(e.target.id, "inst : ", instruction, "example : ",example);

        updateInstruction(instruction);
        updateExample(example);

        switch(level){
            case 1:
                setChapter(e.target.id);                
            break;
            case 2:
                setSubChapter(e.target.id);                
            break;
            case 3:
                navigate('/instruction');
            break;
        }
        setLevel(pv=>pv+1);
    }

    useEffect(()=>{
        let ItemObject = {}
        switch(level){
            case 1:
                ItemObject = getObject(module, "", "");                
            break;
            case 2:
                ItemObject = getObject(module, chapter, "");
            break;
            case 3:
                ItemObject = getObject(module, chapter, subChapter);
            break;
        }

        if(ItemObject)
        {
            // console.log(ItemObject.items);
            if(ItemObject.items)
            {
                if(ItemObject.items.length>0)
                    setSubCardList(pv=>ItemObject.items);
                else
                {
                   navigate('/instruction');
                }
            }
        }

    }, [level]);

   
  
    
    return(
        <div className = {styles.container}>
            <div className={styles.buttonContainer}>
                <button className={styles.backButton} onClick={handleBack}>Back</button>
            </div>
            <div className={styles.cardContainer}>
                {
                level===0?(
                    <div className = {styles.moduelContainer}>
                    {                        
                        CardList.map((card)=>{                     
                            return <MainCard key = {card} cardname = {card} handleClick = {handleCardClick} />
                        })
                    }            
                    </div>):(
                    <div className={styles.chaptersContainer}>
                    {                        
                        subCardList.map(card=>{
                            return <SubCard heading={card.title} key = {card.title} subheading={card.subTitle} instruction = {card.instruction} example = {card.example} handleClick = {handleSubCardClick}/>
                        }) 
                    }
                    </div>)
                }
            </div>
        </div>
    )
}