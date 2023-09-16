import { useEffect, useState, useContext } from 'react';
import styles from './TestScreen.module.css';
import audioIcon from '../../assets/Audio_Icon.png'
import {getFilenamesInWords, getFolderNames} from '../../utils/FilenameList';
import { getAudio, getFileCount} from '../../utils/AudiofileHandling';
import TestContext from '../../store/testContextProvider';
import Popup from '../Popup/Popup';
import { useNavigate } from 'react-router-dom';

export default function TestScreen(){
    const {testData} = useContext(TestContext);   
    const navigate = useNavigate();

    const [instruction, setInstruction] = useState([
        "Memorize the word",
        "Solve the Math",
        "Recall and repeat all the words in the same order",
     ]);
    const [ci, setCi] = useState(0); //current instruction
    const [level, setLevel] = useState(2); //the level of the test
    const [folderPath, setfolderPath] = useState("");     
    const [showPopup, setShowPopup] = useState(false);    
    
    const [fileCount, setFileCount] = useState([0,0]);    
    const [fileCountStatus, setFileCountStatus] = useState(false);
    const [wordfileNames, setWordFileNames] = useState([]);   
    const [opfileNames, setOpFileNames] = useState([]);   
    const [fileGenerated, setFileGenerated] = useState(false);
    const [wordRndQ, setWordRndQ] = useState([]);
    const [opRndQ, setOpRndQ] = useState([]);
    
    const [ISI, setISI] = useState(5000);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [wordAudioData, setwordAudioData] = useState("");  
    const [opAudioData, setOpAudioData] = useState("");  
   
     //This test has 3 parts, play word, play operation span audio and wait for the response
        
    //Get Audio list count from server and set the instruction
    useEffect(()=>{
        const newFolderPath = getFolderNames(testData.folderNames);
        setfolderPath(newFolderPath);

        const opsInstruction = [
        "ಪದವನ್ನು ಗಮನವಿಟ್ಟು ಕೇಳಿ.",
        "ಗಣಿತದ ಲೆಕ್ಕಾಚಾರ ಸರಿಯಿದೆಯೇ ಅಥವಾ ತಪ್ಪಿದೆಯೇ ಎಂದು ಯೋಚಿಸಿ ಸರಿ/ ತಪ್ಪು ಹೇಳಿ.",
        "ಕೇಳಿದ ಎಲ್ಲಾ ಪದಗಳನ್ನು ನೆನಪಿನಲ್ಲಿಟ್ಟುಕೊಂಡು ಅದೇ ಮಾದರಿಯಲ್ಲಿ ಹೇಳಿ."
        ];

        const rdsInstruction = [
        "ಪದವನ್ನು ಗಮನವಿಟ್ಟು ಕೇಳಿ.",
        "ಕೇಳಿದ ವಾಕ್ಯವು ಸರಿ/ ತಪ್ಪು ಇದೆಯೇ ಎಂದು ಹೇಳಿ",
        "ಕೇಳಿದ ಎಲ್ಲಾ ಪದಗಳನ್ನು ನೆನಪಿನಲ್ಲಿಟ್ಟುಕೊಂಡು ಅದೇ ಮಾದರಿಯಲ್ಲಿ ಹೇಳಿ.",
        ]

        testData.testCode === 5?setInstruction(opsInstruction):setInstruction(rdsInstruction);        
    }, []);

    //GEt the file count from the server
    useEffect(()=>{       
        if(folderPath!=="")   
        {
            async function getFCount(){               
                // console.log("folderPath useEffect");
                const fileCounts = await Promise.all([
                    new Promise((resolve) => {
                    getFileCount(folderPath + "/words", (fileCount) => {
                        resolve(fileCount);
                    });
                    }),
                    new Promise((resolve) => {
                    getFileCount(folderPath + "/opspan", (fileCount) => {
                        resolve(fileCount);
                    });
                    })
                ]);
                            
                setFileCount(fileCounts);
                setFileCountStatus(true);
            }        
            getFCount();                   
        }
    }, [folderPath]);

    

    
    //Generate the file name for the file count
    useEffect(()=>{
        if(fileCountStatus)
        {            // console.log("get all files");
            let fileNames = "";
            function getFileNames(){     
            try {           
                    fileNames = getFilenamesInWords(1,fileCount[0]);
                    setWordFileNames(fileNames);   
                    
                    fileNames = getFilenamesInWords(1,fileCount[1]);
                    setOpFileNames(fileNames);
                                        
                    setFileGenerated(true);
                } catch (error) {
                    console.error("Error fetching file names:", error);
                }             
            };        

            getFileNames();   
        }            
    }, [fileCountStatus]);

    //Get the random word and the sentence
    function setRandomStimulus(){
        // console.log("generate random numbers");
        const generateRandomNumberArray = (setData, n) => {                        
            const filePosArray = [];  
            
            //Push data to arrat, the values should not repeat

            
            while(filePosArray.length<level)
            {
                let random = Math.floor(Math.random() * n) + 1;             
                random = random==n?n-1:random;  
                
                if(n>=level)                
                {
                    if(!filePosArray.includes(random))
                        filePosArray.push(random);
                }
                else
                {
                    filePosArray.push(random);
                }
            }   
            
            setData(filePosArray);
            console.log(level,filePosArray);
        };        
       
        // console.log("fileCount: ", fileCount)
        generateRandomNumberArray(setWordRndQ, fileCount[0]);
        generateRandomNumberArray(setOpRndQ, fileCount[1]);
    }

    useEffect(() => {
        if(fileCountStatus)
        {
            console.log("New stimulus set");
            setRandomStimulus();
        }
    }, [fileCountStatus, level]);


    //Test Procdure
    //Untill all words of the that level played, play word, delay play operation span audio, then with third instruciton with recall
    //Then if all correct next level, otherwise, Same level with different stimulis

        //function GetAudio
        async function getAudioFile(filePath1, filePath2){
        //    console.log(filePath1, filePath2);
            try {
                const [audioData1, audioData2] = await Promise.all([
                  new Promise((resolve) => {
                    getAudio(filePath1, (data) => {
                      resolve(data);
                    });
                  }),
                  new Promise((resolve) => {
                    getAudio(filePath2, (data) => {
                      resolve(data);
                    });
                  })
                ]);
            

                setwordAudioData(audioData1);
                setOpAudioData(audioData2);
              } catch (error) {
                console.error("Error fetching audio data:", error);
              }
        }
    
        
        useEffect(()=>{
            if(currentQuestion<level)
            {
                if(fileGenerated)
                {
                    // console.log("wordfilename length", wordfileNames.length);
                    if(wordfileNames.length>0)
                    {
                        // console.log("levelWords :", wordfileNames, "RndList :", wordRndQ, currentQuestion);
                        getAudioFile(folderPath + "/words/" + wordfileNames[wordRndQ[currentQuestion]], folderPath + "/opspan/" + opfileNames[opRndQ[currentQuestion]]);
                    }
                }
            }else{

            }
        }, [fileGenerated, currentQuestion]);



        useEffect(()=>{
            if(wordAudioData!="" && opAudioData!=""){
                 const wordAudio = new Audio(wordAudioData);
                 const opAudio = new Audio(opAudioData);

                 setTimeout(() => {
                 wordAudio.play();
                 }, 500);

                 const handleAudioPlay = ()=>{
                    wordAudio.removeEventListener("ended", handleAudioPlay);
                    setTimeout(() => {
                        opAudio.play();
                        setCi(1);
                    }, ISI);
                 }

                 wordAudio.addEventListener("ended", handleAudioPlay);
            }
        }, [wordAudioData]);


        function response(e){
            console.log(currentQuestion, level);
            if(ci==1){
                if(currentQuestion<level-1)  //NOt all quesitons played yet
                {
                    setCurrentQuestion(currentQuestion+1)
                    setCi(0);
                }
                else{
                    setCi(2);      
                }          
            }else{
                if(e.target.id==="correct")  //If correct recall,                 
                    setLevel(level+1);
                
                setCurrentQuestion(0);
                setCi(0);                
            }
        }

        function handleExit(e){
            setShowPopup(true);     
        }

        const togglePopup = () => {
            setShowPopup(!showPopup);
            navigate('/homepage');
         };


    return(
        <div className={styles.container}>
           <div className={styles.level}>level : {level} Recall</div>
           <div className={styles.instruction}>{instruction[ci]}</div>
           <div className={styles.content}>            
           {
             ci<2?(<img src={audioIcon} alt='audio icon' />):(null)
           }
            </div>
            
                <div className={styles.buttonList}>
                    <div className={styles.responseButton}>
                    {
                        ci>=1?(
                            <>
                                <button id="correct" className={styles.correct} onClick={response}>Correct</button>
                                <button id="wrong" className={styles.wrong} onClick={response}>Wrong</button>
                            </>                        
                       ):(
                           null
                       )

                    }    
                    </div>
                    <div className={styles.commonButtons}>
                        <button id="exit" style={{backgroundColor: "#6F61C0"}} className={styles.repeat} onClick={handleExit}>Exit</button>
                    </div>                
                </div>
                {showPopup && <Popup message={(level-1) + " level(s) completed"} onClose={togglePopup} />}                     
        </div>
    )
}