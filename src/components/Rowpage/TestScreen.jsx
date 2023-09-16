import { useContext, useEffect, useState } from 'react';
import styles from './TestScreen.module.css';
import audioIcon from '../../assets/Audio_Icon.png'
import TestContext from '../../store/testContextProvider';
import { getAudio, getFileCount } from '../../utils/AudiofileHandling';
import { getFolderNames, getFilenamesInWords } from '../../utils/FilenameList';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';

export default function TestScreen(){
    const {testData} = useContext(TestContext);
    const navigate = useNavigate();
    const[ISI, setISI] = useState(1000);
    const[level, setLevel]= useState(1); //Max level 3
    const[currentStage, setCurrentStage]= useState(0); //Max stage 8    
    const[ci, setCi] = useState(0)
    const[cq, setCq] = useState(0); //current question, max question is the stage number
    
    const[pass, setPass] = useState(false);
    const[NA, setNA] = useState(false);  //Not Answerd.
    const[threeForthScore, setThreeForthScore] = useState(0);
    const[qCount, setQCount] = useState(0);

    const [folderPath, setfolderPath] = useState(""); 
    const [fileCount, setFileCount] = useState(0);    
    const [fileNames, setFileNames] = useState([]);
    const [fileGenerated, setFileGenerated] = useState(false);
    const [filePos, setFilePos] = useState([]);
    const [audioData, setAudioData] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [instruction, setInstruction] = useState("")
        
    let minStage = 4;
    const maxStage = 8;
    const maxLevel = 3;

    //Test begins, Get folder path
    useEffect(()=>{       
        const newFolderPath = getFolderNames(testData.folderNames);
        setfolderPath(newFolderPath);
        minStage = level+1;
        setCurrentStage(minStage)
    }, []);

    
    //Get the max question, 
    useEffect(()=>{               
        if(folderPath!=="")   
        {
            async function getFCount(){               
                // console.log("folderPath useEffect");
                await getFileCount(folderPath, (fileCount)=>{
                    setFileCount(fileCount);              
                })
            }        
            getFCount();
        }
    }, [folderPath]);
    
    //Randomly pick the max stage number stimulus
    useEffect(()=>{        
        if(fileCount>0)
        {
            // console.log("get all files");
            let fileList = "";
            function getFileNames(){     
            try {           
                fileList = getFilenamesInWords(1,fileCount);
                    setFileNames(fileList);         
                    setFileGenerated(true);                                  
                } catch (error) {
                    console.error("Error fetching file names:", error);
                }             
            };        

            getFileNames();   
        }            
    }, [fileCount]);

    //Generate random filename list to present for that stage
    function setRandomStimulus(){
        // console.log("generate random numbers");
        const generateRandomNumberArray = (setData, n) => {
            const array = [];                      
            for (let i = 0; i < maxStage; i++) {
              const random = Math.floor(Math.random() * n) + 1;
              array.push(random);              
            }
            setData(array);
            // console.log(array, fileNames);
        };        
       
        generateRandomNumberArray(setFilePos, fileCount-1);      
    }

    useEffect(() => {
        if(fileCount>0)
        {
            // console.log("New stimulus set");
            setRandomStimulus();
        }
    }, [fileCount, currentStage, NA]);

      //Instruciton
      useEffect(()=>{
        if(ci==0)
            setInstruction("ಸಂಖ್ಯೆಯನ್ನು  ಗಮನವಿಟ್ಟು ಕೇಳಿ");
        else{
            if(level==1){
                setInstruction("ಈಗ ಕೊನೆಯ ಸಂಖ್ಯೆಯನ್ನು ಹೇಳಿ.");
            }else if(level==2){
                setInstruction("ಈಗ ಕೊನೆಯ ಎರಡು ಸಂಖ್ಯೆಗಳನ್ನು ನೆನಪಿನಲ್ಲಿಟ್ಟುಕೊಂಡು ಅದೇ ಮಾದರಿಯಲ್ಲಿ ಹೇಳಿ.");
            }else{
                setInstruction("ಈಗ ಕೊನೆಯ ಮೂರು ಸಂಖ್ಯೆಗಳನ್ನು ನೆನಪಿನಲ್ಲಿಟ್ಟುಕೊಂಡು ಅದೇ ಮಾದರಿಯಲ್ಲಿ ಹೇಳಿ.")
            }
        }

    }, [level, ci]);


    //Test Procedure
    //Play the audio one by one from cq1 to max of that stage at an ISI delay    
    useEffect(()=>{
        if(fileGenerated)
        {
            console.log(cq,currentStage)
            async function getAudioFile(){
                if(cq<currentStage)
                {
                        const filename = fileNames[filePos[cq]];
                        // console.log(folderPath +"/"+ filename);
                        await getAudio(folderPath +"/"+ filename, (data)=>{
                            setAudioData(data);
                        });
                }else {
                        setCi(1);         //when all the question of tha stage is complete, Change the instruction and display correct/wrong button for response
                }
           }
    
            getAudioFile();
        }
    }, [fileGenerated, cq]); //When Filenames are selected and incremented to next quesiton

    useEffect(()=>{
        if(audioData!="")
        {
            // console.log(audioData);
            const rsAudio = new Audio(audioData);
            
            setTimeout(() => {
                rsAudio.play();
                setCq(cq+1);
            }, ISI);
        }
    }, [audioData])

    //When responded, increase the level/ if the current level reaches max level reaches, display a message and exit    

    function response(e){
        e.preventDefault();
        // console.log("question-stage-level", cq, currentStage, level);
        if(e.target.id==="correct")  //If correct recall,   
        {
            if(NA){
                blockQAResponse(true);
            }else{
                if(currentStage+1<=maxStage)
                {
                    console.log("stage updated")
                    setCurrentStage(currentStage+1);
                    setCi(0);
                    setCq(0);
                }
                else
                {
                    if(level+1<=maxLevel)
                    {
                        console.log("level updated")
                        setLevel(level+1);
                        minStage = level+1; //When a level is changed, The min stage will be level + 1
                        setCurrentStage(minStage);
                        setPass(true);
                        // setShowPopup(true);
                    }else{
                        setShowPopup(true);
                        console.log("Test over");
                    }
                }
            }   
        }else{
            if(NA){
                blockQAResponse(false);
            }else{
                console.log("wrong first answer, new block")
                setCi(0);
                setCq(0);
                setNA(true);            
            }

        }
    }

    function blockQAResponse(correctResponse){  
        
        if(correctResponse){
            console.log("Correct score added")
            setThreeForthScore(pv=>pv+1);   
            
            if(threeForthScore==2)
            setPass(true);
        }

        

        if(qCount==3)              //new block created at the end    
        {
            console.log("next block");           
            setThreeForthScore(0);  //Set score to 0            
            setQCount(0);           //set qcount to 0             
        }else
            setQCount(pv=>pv+1);  //Block continues               
         

            console.log("Block Answer");  
            setRandomStimulus();
            setCi(0);
            setCq(0);       
    }

    useEffect(()=>{
        console.log("block-score-question", NA, threeForthScore, qCount);
    }, [qCount])

    useEffect(()=>{        
        if(pass) {  //Block passed
            console.log("Block passed, next stage")
            setNA(false);
            setThreeForthScore(0);
            setQCount(0);           //set qcount to 0   
            setCurrentStage(currentStage+1);
            setCi(0);
            setCq(0);
            setPass(false);
        }
        
    }, [pass]);

    const togglePopup = () => {
        setShowPopup(!showPopup);

        if(level==maxLevel)
            navigate('/homepage');
     };


    return(
        <div className={styles.container}>
          <div className={styles.level}>level : {level} Recall</div>
           <div className={styles.instruction}>{instruction}</div>
           <div className={styles.content}>            
           {
             ci<1?(<img src={audioIcon} alt='audio icon' />):(null)
           }
            </div>            
            {
                ci===1?(<div className={styles.buttonList}>
                    <button id="correct" className={styles.correct} onClick={response}>Correct</button>
                    <button id="wrong" className={styles.wrong} onClick={response}>Wrong</button>
                </div>):(
                    null
                )
            }      
            {showPopup && <Popup message={"completed successfully"} onClose={togglePopup} />}
        </div>

    )
}

// ISI = 1000ms
// stage (level+1)-8
// level - 1-3
//If first reply in eacvh stage is wrong, repeat 4 times, until 3 out 4 answers are right