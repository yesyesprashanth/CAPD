import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TestScreen1.module.css'
import Button from './Button';
import audioIcon from '../../assets/Audio_Icon.png'
import TestContext from '../../store/testContextProvider';
import { getAudio, getFileCount, getImageOptionList, getOptionList } from '../../utils/AudiofileHandling';
import Popup from '../Popup/Popup';
import {getFilenamesInWords, getFolderNames} from '../../utils/FilenameList';

export default function TestScreen1(){
    const {testData, instruction} = useContext(TestContext);   
    const navigate = useNavigate();

    const [audioData, setAudioData] = useState("");  
    const [folderPath, setfolderPath] = useState("");       
    const [fileNames, setFileNames] = useState([]);    
    const [currentAudio, setCurrentAudio] = useState(0);
    const [score, setScore] = useState(0);
    const [totalStimulus, setTotalStimulus] = useState(0);
    const [repeatCount, setRepeatCount] = useState(0);
    const [optionList, setOptioList] = useState([]);
    
    const [opt, setOpt] = useState(["ಚಮತ್ಕಾರ", "ಅಂಗಡಿಬೀದಿ", "ಸಕ್ಕರೆಮಿಠಾಯಿ"]);
    // const [opt, setOpt] = useState(["ಬ", "ದು", "ಬ"]);
    const [showPopup, setShowPopup] = useState(false);
    const [buttonData, setButtonData] = useState({
        name1:"Correct",
        color1: "#16680E",
        name2: "Wrong",
        color2: "#730D0D"
    })
  

    //Display Buttons
    const buttonDataList = [
        {
            name1:"Correct",
            color1: "#16680E",
            name2 : "Wrong",
            color2: "#730D0D"
        }        
    ]


    useEffect(()=>{
        console.log("order1")
        function setButton(){
            if(testData.testCode===1 || testData.testCode===3 || testData.testCode===3.1 || testData.testCode===4){
                setButtonData(pv=>({
                    ...pv, name1: buttonDataList[0].name1, color1: buttonDataList[0].color1, name2: buttonDataList[0].name2, color2: buttonDataList[0].color2
                }))
            }else{
                setButtonData(pv=>({
                    ...pv, name1: buttonDataList[1].name1, color1: buttonDataList[1].color1, name2: buttonDataList[1].name2, color2: buttonDataList[1].color2
                }))                
            }                
        }
        setButton();
    }, [testData.testCode]); 


    //Join all the foldername to get the folderpath, Get the option list
    useEffect(()=>{        
        setfolderPath(pv=>getFolderNames(testData.folderNames));  
        console.log("order2", folderPath)
       
        async function getOptions(){
            await getOptionList(testData.folderNames[testData.folderNames.length-1], getFolderNames(testData.folderNames), (data)=>{
                // console.log("OptionList", data);                
                setOptioList(pv=>data);
            });
        };

        if(testData.testCode===3)
            getOptions();             
    }, [])


    ///////////////////Remove Option file from the folder in Auditory Assos Module, It causes no data error"

    //Get the fileCount from the folder (request to backend)
    useEffect(()=>{     
        if(folderPath!="")
        {   
            console.log("order3")            
            async function getFileNames(){    
                await getFileCount(folderPath, fileCount => {   
                    console.log("calling randomise with filecount", fileCount)           
                    fileCount = fileCount; // reduce one filecount, because some folder as option file

                    //If the module is sendtence, Then There are three image files for each audio file, hence 
                    //Divide the file count by 4
                    if(testData.testCode===3.1)
                        fileCount = fileCount/4;

                    setFileNames(pv=>getFilenamesInWords(1,fileCount, true)); 
                    // console.log("testPage filelist", fileNames)
                });           
            }        
            getFileNames(); 

            console.log("Calling FolderPath update function", folderPath);
        }

    }, [folderPath]); 
   
    ////////////////////////Repeat from here for Each Question////////////////////////////////

    
    //Get the audio and options from the server(backend)
    useEffect(()=>{
        console.log("order4")
        console.log(currentAudio, fileNames)
        async function setImageOptionList(){
            await getImageOptionList(folderPath, fileNames[currentAudio], (data)=>{
                console.log("getOptionlist", data);
                setOpt(data);
                // console.log("testscreen:", data);
            })    
        }
        
        async function getAudiofile(){
            console.log(folderPath + "/" + fileNames[currentAudio])
            await getAudio(folderPath + "/" + fileNames[currentAudio], (data)=>{                  
                setAudioData(data);                
                if(testData.testCode===3)
                {                    
                    console.log("optionlist", optionList[0], currentAudio);
                    setOpt(pv=>optionList[currentAudio].split('-'));
                    // console.log("letter Options :", optionList[currentAudio]);
                }
                else if(testData.testCode===3.1){
                    setImageOptionList();           
                }
            });
        };
        
        if(fileNames.length>0 ){    
            console.log("Calliing Audio file function")     
            getAudiofile();
        }
            
    }, [currentAudio, fileNames]);

    // These set of functions plays the audio file
    useEffect(()=>{   
        console.log("order 5")           
        if(audioData) play();
    }, [audioData]);

    function play(){    
        console.log("Calling Play function");
        setTimeout(() => {
            if(audioData!=="")
            {
                const audio = new Audio(audioData);               
                audio.play();  
                console.log(audio);
            }
        }, 500);        
    }

    function  PlayNextAudio(){
        console.log("Calling Next Audio Function");

           if(currentAudio>=fileNames.length-1) setCurrentAudio(pv=>0);
           else setCurrentAudio(pv=>pv+1);
    }
   
    function handleRepeat(){
        play();
        setRepeatCount(pv=>pv+1);
     }
 
     function handleResponse(e){
         let response = 0;       
         setRepeatCount(pv=>0)
         response = (e.target.id === "btn1")? 1: 0;
 
         //Save Response        
          setScore(pv=>pv+response);
          setTotalStimulus(pv=>pv+1);
 
         //Play next Audio
         PlayNextAudio();
     }
    
    function handleExit(){
        setShowPopup(true);        
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
       navigate('/homepage');
     };
    
    function content(){
        switch(testData.testCode){
            case 1:               
                return(
                    <>
                        <img src={audioIcon} alt='audio icon' />                                                                            
                    </>
                )
            break;          
            case 3:
                return(   
                    <>                              
                    <img src={audioIcon} alt='audio icon' />                       
                    <div className={styles.optionList}>

                        <div>
                            <div className={styles.option}>{opt[0]}</div>
                            <div className = {styles.optName}>1</div>
                        </div>
                        <div>
                            <div className={styles.option}>{opt[1]}</div>
                            <div className = {styles.optName}>2</div>
                        </div>
                        <div>
                            <div className={styles.option}>{opt[2]}</div>
                            <div className = {styles.optName}>3</div>
                        </div>

                    </div>                          
                    </>
                )
                break;
            case 3.1:         
                return(
                    <>
                    <img src={audioIcon} alt='audio icon' />   
                    <div className={styles.imageList}>
                    <div>
                        <img src = {opt[0]} alt="image1" />
                        <div className = {styles.optName}>1</div>
                    </div>
                    <div>
                        <img src = {opt[1]} alt="image2" />
                        <div className = {styles.optName}>2</div>
                    </div>
                    <div>
                        <img src = {opt[2]} alt="image3" />
                        <div className = {styles.optName}>3</div>
                    </div>
                    </div>                          
                    </>
                )
            break;
            case 4:           
            return(                 
                    <div className={styles.buttonList}>
                        <button>4</button>
                        <button>2</button>
                        <button>0</button>
                        <button>-2</button>
                        <button>-4</button>
                    </div>                
                )   
            break;
        }        
    }

 
    return(
        <div className={styles.testPage}>
        <div className= {styles.title}>{testData.title}</div>
        <div className={styles.container}>
            <div className={styles.instruction}>{instruction.instruction}</div>
            <div className={styles.content}>
            {
                content()
            }
            </div>
            {                
                <div className={styles.buttonList}>
                <div className={styles.responseButton}>
                    <Button id="btn1" name = {buttonData.name1} bgColor= {buttonData.color1} handleClick = {handleResponse} disable={false} />
                    <Button id="btn2" name = {buttonData.name2}  bgColor={buttonData.color2} handleClick = {handleResponse} disable={false}/> 
                </div>
                <div className={styles.commonButtons}>
                    <Button id="repeat" name = "Repeat" bgColor= "#6F61C0" handleClick = {handleRepeat} disable={repeatCount>1?true:false}/>
                    <Button id="exit" name = "Exit" bgColor="#6F61C0" handleClick = {handleExit} disable={false}/>                
                </div>      
                </div>                
            }
            {showPopup && <Popup message={score + "/" + totalStimulus} onClose={togglePopup} />}
        </div>           
        </div>
    )
}
