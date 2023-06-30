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
    const {updateInstruction, updateTesCode} = useContext(TestContext);

    const navigate = useNavigate();

    const CardList = getModuleList();     
    // console.log("Initial:", level);       

    function handleCardClick(e){        
        setModule(pv=>e.target.id);    
        setLevel(pv=>pv+1)        
        // console.log("click:", level);     
    }

    function handleSubCardClick(e){     
        const data = e.target.getAttribute('data-instruction');
        console.log(data)                  
        switch(level){
            case 1: //CHapter
                setChapter(e.target.id);  
                setLevel(pv=>pv+1)                       
                break;
            case 2: //SubChapter
                setSubChapter(e.target.id); 
                setLevel(pv=>pv+1)                
                break;  
            case 3: //Level
                console.log("Instruction page");
                navigate('/instruction');
                break;
        }     
        // console.log("click:", level);    
    }

    function handleBack(e){
        e.preventDefault();        
        // console.log("button clicked");
        // console.log(level);
              
        if(level>0)
            setLevel(pv=>pv-1) 
    }

    useEffect(()=>{        
        function getList(module, chapter, subChapter){
            //  console.log(module, chapter, subChapter);
            let itemObject = "";               
                switch(level){
                    case 1: 
                        itemObject = getObject(module, "", "");        //Chapters                            
                        // console.log("Chapter");   
                        break;                                 
                    case 2:
                        setChapter(chapter);                
                        itemObject = getObject(module, chapter, "");   //Sub Chapters
                        updateTesCode(pv=>itemObject.testCode);                       
                        // console.log("SubChapter");
                        break;
                    case 3:
                        setSubChapter(subChapter);                
                        itemObject = getObject(module, chapter, subChapter); //Levels                      
                        // console.log("Level");
                        break;                                                  
                    }

            console.log(itemObject);
            updateInstruction(pv=>itemObject.instruction);           
            if(itemObject)
            {
                if(itemObject.items.length===0) navigate('/instruction');
                setSubCardList(pv=>itemObject.items);                 
                // console.log("UE:", level);            
            }
        }       
       
        getList(module, chapter, subChapter);
        // console.log("UseEffect called");
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
                            return <SubCard heading={card.title} key = {card.title} subheading={card.subTitle} handleClick = {handleSubCardClick}/>
                        }) 
                    }
                    </div>)
                }
            </div>
        </div>
    )
}