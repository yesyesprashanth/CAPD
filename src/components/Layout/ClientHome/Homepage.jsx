import { useState, useEffect, useContext } from 'react';
import styles from './Homepage.module.css';
import MainCard from '../../Card/MainCard';
import SubCard from '../../Card/SubCard';
import {getModuleList, getObject} from '../../../utils/ModuleStructure.js'
import { useNavigate } from 'react-router-dom';
import TestContext from '../../../store/testContextProvider';
import { setFolderNames } from '../../../utils/FilenameList';


export default function Homepage(){            
    const [subCardList, setSubCardList] = useState([]);
    const {instruction, testData} = useContext(TestContext); 
    const navigate = useNavigate();

    const CardList = getModuleList();     

    function handleBack(e){
        e.preventDefault();        
        
        switch(testData.level){
            case 1: testData.updateModule(pv=>"");
            break;
            case 2: testData.updateChapter(pv=>"");
            break;
            case 3: testData.updateSubChapter(pv=>"");
            break;
            default:                
        }

             
        if(testData.level>0)
            testData.updateLevel(pv=>pv-1); 
    }
      
    
    function handleCardClick(e){     
        e.preventDefault();     
        testData.updateModule(pv=>e.target.id);    
        testData.updateLevel(pv=>pv+1); 
        setFolderNames(0, e.target.id, testData.folderNames, testData.updateFolderNames)
    }

    function handleSubCardClick(e){
        e.preventDefault();  
        const instructionData = e.target.getAttribute("data-instruction");
        const example = e.target.getAttribute("data-example");
        const folderName = e.target.getAttribute("data-foldername");
        testData.updateTitle(e.target.id);
              
        instruction.updateInstruction(pv=>instructionData);
        instruction.updateExample(example);

        switch(testData.level){
            case 1:
                testData.updateChapter(e.target.id);  
                setFolderNames(1, folderName, testData.folderNames, testData.updateFolderNames)
                testData.updateLevel(pv=>pv+1);              
            break;
            case 2:
                testData.updateSubChapter(e.target.id);                
                setFolderNames(2, folderName, testData.folderNames, testData.updateFolderNames)
                testData.updateLevel(pv=>pv+1);
            break;
            case 3:                
                setFolderNames(3, folderName, testData.folderNames, testData.updateFolderNames)
                navigate('/instruction');
            break;
            default:
               
        }

        
    }

    

    //To get the List of items
    useEffect(()=>{

        // console.log(testData.module, testData.level, testData.chapter, testData.subChapter);
        // console.log(testData.folderNames)


        let itemObject = {}              
        switch(testData.level){
            case 1:                
                itemObject = getObject(testData.module, "", "");                        
            break;
            case 2:
                itemObject = getObject(testData.module, testData.chapter, "");                            
            break;
            case 3:
                itemObject = getObject(testData.module, testData.chapter, testData.subChapter);
                testData.updateTesCode(pv=>itemObject.testCode);
            break;
            default:               
        }

        
        if(itemObject)
        {     
            if(itemObject.items)
            {           
                if(itemObject.items.length>0)
                {                                
                    setSubCardList(pv=>itemObject.items);                                 
                }
                else
                {                   
                   testData.updateTesCode(pv=>itemObject.testCode);
                   testData.updateLevel(testData.level-1);
                   navigate('/instruction');
                }
            }
        }

    }, [testData.level]);

   
  
    
    return(
        <div className = {styles.container}>
            <div className={styles.buttonContainer}>
                <button className={styles.backButton} onClick={handleBack}>Back</button>
            </div>
            <div className={styles.cardContainer}>
                {
                testData.level===0?(
                    <div className = {styles.moduelContainer}>
                    {                        
                        CardList.map((card)=>{                     
                            return <MainCard key = {card} cardname = {card} folderName = {card.folderName} handleClick = {handleCardClick} />
                        })
                    }            
                    </div>):(
                    <div className={styles.chaptersContainer}>
                    {                        
                        subCardList.map(card=>{                                           
                            return <SubCard heading={card.title} key = {card.title} subheading={card.subTitle} instruction = {card.instruction} example = {card.example} folderName = {card.folderName} handleClick = {handleSubCardClick}/>
                        }) 
                    }
                    </div>)
                }
            </div>
        </div>
    )
}