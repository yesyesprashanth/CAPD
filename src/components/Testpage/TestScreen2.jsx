import { useEffect, useState, useContext } from 'react';
import styles from './TestScreen2.module.css';
import TestContext from '../../store/testContextProvider';
import { useNavigate } from 'react-router-dom';
import audioIcon from '../../assets/Audio_Icon.png'
import { setFolderNames, getFolderNames, getFilenamesInWords } from '../../utils/FilenameList';
import { getFileCount, getAudio } from '../../utils/AudiofileHandling';
import Popup from '../Popup/Popup';

export default function TestScreen2(){
    const {testData} = useContext(TestContext);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);    
    const [showRButtons, setShowRButtons] = useState(false);
    const [showOButtons, setShowOButtons] = useState(false);
    const [stage, setStage] = useState(0);
    const [instruction, setInstruction] = useState("");
    const [buttonDisplay, setButtonDisplay] = useState("Exit");

    const [difficulty, setDifficulty] = useState(false);
    const [folderPath, setfolderPath] = useState("");   
    const [fileCount, setFileCount] = useState(0);    
    const [fileNames, setFileNames] = useState([]);
    const [storyComplete, setStoryComplete] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(true);
    const [cQ, setCQ] = useState(0);
    const [audioData, setAudioData] = useState(""); 
    

    const [score, setScore] = useState(0);
    const [totalStimulus, setTotalStimulus] = useState(0);
    const [repeatCount, setRepeatCount] = useState(0);

    
    useEffect(()=>{
        switch(stage){
            case 0:
                setInstruction("ಕೆಳಗಿನ ಹಂತವನ್ನು  ಆಯ್ಕೆ ಮಾಡಿ");          
                setShowRButtons(false);
                setShowOButtons(false);                
            break;
            case 1:
                setInstruction("ನಾನು ಹೇಳುವ ಕಥೆಯನ್ನು ಗಮನ ಕೊಟ್ಟು ಕೇಳಿ ನಂತರ ಅದಕ್ಕೆ ಸಂಬಂದಿಸಿದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ  ಮತ್ತು ಹಿನ್ನೆಲೆ ಶಬ್ದಕ್ಕೆ ಗಮನ ನೀಡದಿರಿ");          
                setButtonDisplay("Questions");
                setButtonDisable(false);
                setShowRButtons(false);
                setShowOButtons(true);                
            break;
            case 2:
                if(testData.testCode===4.1)
                    setInstruction("ನಾನು ಹೇಳುವುದನ್ನು ಕೇಳಿಸಿಕೊಂಡು ಅದರಂತೆ ಅನುಸರಿಸಿ");          
                else                
                    setInstruction("ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ");          
                
                setShowRButtons(true);
                setShowOButtons(true);                
            break;
            default:
                console.log("error in Instruction switch statment");
        }
    }, [stage])

    //Get folder path
    useEffect(()=>{        
        if(difficulty)
            setfolderPath(pv=>getFolderNames(testData.folderNames));          

    },[difficulty]);

    //Get the max question and filenames, 
    useEffect(()=>{               
        if(folderPath!="")   
        {
            if(testData.testCode===4.1 || storyComplete) //Follow direction
            {
                async function getFCount(){                              //Get all the audio files
                    // console.log("folderPath", folderPath);
                    await getFileCount(folderPath, (fileCount)=>{
                        // console.log("filecount", fileCount);
                        setFileNames(pv=>getFilenamesInWords(1,fileCount)); 
                        setFileCount(fileCount-1);              
                    })                
                }        
                getFCount();
            }else{  //Story
                // console.log("story");
                setFileNames(["story.wav"])
            }
        }
    }, [folderPath, storyComplete]);

    //Play audio one by one
    useEffect(()=>{
        if(fileNames.length>0)
        {            
            // console.log("playing");
            async function getAudiofile(){
                await getAudio(folderPath + "/" + fileNames[cQ], (data)=>{                  
                    setAudioData(data);
                })
            }
            
            getAudiofile();
                 
        }
    }, [fileNames, cQ])

    useEffect(()=>{              
        play();
    }, [audioData]);

    function play(){        
        setTimeout(() => {
            if(audioData!="")
            {
                const audio = new Audio(audioData);               
                audio.play();  
                                
                //if story playing is complete
                if(testData.testCode!==4.1)
                {
                    // console.log("story complete")
                    const handleAudioPlayEnded = ()=>{
                        setButtonDisable(true);  //Question button
                    }

                    audio.addEventListener("ended", handleAudioPlayEnded);
                }
            }
        }, 500);        
    }

    function changeStage(){
        if(stage<2)
        {
            testData.testCode==4.1?(setStage(2)):(setStage(stage+1))
        }            
        else
            setStage(0);
    }
   
    function handleSNR(e){
        e.preventDefault();
        const difficulty = e.target.id;
        const folderLength = testData.folderNames.length;
        setFolderNames(folderLength, e.target.id, testData.folderNames, testData.updateFolderNames)     
        setDifficulty(true);
        changeStage();
    }

    function handleExit(e){
        if(stage==1){
            // console.log("story complete")                        
            setButtonDisplay("Exit");
            setStoryComplete(true); 
            setRepeatCount(pv=>0)          
            setStage(2);
        }else{
            navigate('/homepage');
        }        
    }

    function handleRepeat(e){
        play();
        setRepeatCount(pv=>pv+1);
    }

    function handleResponse(e){
        let response = 0;       
         setRepeatCount(pv=>0)
         response = (e.target.id === "correct")? 1: 0;
 
         //Save Response        
          setScore(pv=>pv+response);
          setTotalStimulus(pv=>pv+1);

        //   console.log(cQ, fileCount-1);
          if(cQ<fileCount-1)
            setCQ(pv=>pv+1);  
          else
            setShowPopup(!showPopup);
    }
 

    const togglePopup = () => {
        setShowPopup(!showPopup);
        navigate('/homepage');
     };

     function content(){
        switch(stage){
            case 0:                
                return(
                    <div className={styles.buttonList}>
                        <button id="easiest" style={{backgroundColor: "#6F61C0"}} onClick={handleSNR}>Easiest</button>
                        <button id="easy" style={{backgroundColor: "#6F61C0"}} onClick={handleSNR}>Easy</button>                        
                        <button id="normal" style={{backgroundColor: "#6F61C0"}} onClick={handleSNR}>Normal</button>
                        <button id="hard"style={{backgroundColor: "#6F61C0"}}onClick={handleSNR}>Hard</button>
                        <button id="hardest" style={{backgroundColor: "#6F61C0"}} onClick={handleSNR}>Hardest</button>
                    </div>       
                )
                break;
            case 1:                       
                return(
                    <img src={audioIcon} alt='audio icon' />
                )
                break;
            case 2:                
                return (
                <div className={styles.question}>
                   <div>{cQ+1}/</div>
                   <div>{fileCount}.</div>
                   <img src={audioIcon} alt='audio icon' />
                </div>
                   
                )
                break;
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.instruction}>{instruction}</div>
            <div className={styles.content}>
                {
                    content()
                }                
            </div>
                <div className={styles.buttonList}>
                {
                 showRButtons?(                     
                        <div className={styles.responseButton}>
                            <button id="correct" className={styles.correct} onClick={handleResponse}>Correct</button>
                            <button id="wrong" className={styles.wrong} onClick={handleResponse}>Wrong</button>
                        </div>
                 ):(null)
                }
                {
                    showOButtons?(
                        <div className={styles.commonButtons}>
                            {                                
                               repeatCount<2?(<button id="repeat" style={{backgroundColor: "#6F61C0"}} className={styles.repeat} onClick={handleRepeat}>Repeat</button>):(null)
                            }
                            {
                                buttonDisable?(<button id="exit" style={{backgroundColor: "#6F61C0"}} className={styles.repeat} onClick={handleExit}>{buttonDisplay}</button>):(null)
                            }
                        </div>      
                    ):(null)
                }
                </div>            
            {showPopup && <Popup message={score + "/" + totalStimulus} onClose={togglePopup} />}
        </div>
    )
}