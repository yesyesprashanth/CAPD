import React, {createContext, useEffect, useState} from 'react';


const TestContext = createContext(null);

export function TestContextProvider({children}){
    const [testCode, setTestCode] = useState(1);
    const [instruction, setInstruction] = useState("");
    const [example, setExample] = useState("");
    const [testMode, setTestMode] = useState(0); //0 - Practice session, 1 - actual session
    const [selectedmoduleData, setSelectedModuleData] = useState({
        level:0,
        module:"",
        chapter:"",
        subChapter:"",        
    });
    const [title, setTitile] = useState("");
    const [folderNames, setFolderNames]  = useState([]);

    const [module, setModule] = useState("");    
    const [chapter, setChapter] = useState("");
    const [subChapter, setSubChapter] = useState("");
    const [level, setLevel] = useState(0);    
    // const [backendIP, setBackendIP] = useState("");
    
    // const webServerPods = [
    //     'http://192.168.0.13:30337', // Replace with the actual IP addresses or URLs of your web server pods
    //     'http://192.168.0.14:30337',
    //     'http://192.168.0.15:30337',
    //   ];

    // useEffect(()=>{
    //     const checkWebServers = async () => {
    //         for (const podIP of webServerPods) {
    //           try {
    //             const response = await fetch(podIP);
    //             if (response.status === 200) {
    //                 console.log(podIP);
    //                 setBackendIP(podIP); // Store the IP address of the available web server
    //               break; // Stop checking other pods once an available one is found
    //             }
    //           } catch (error) {
    //             // Handle any fetch errors (e.g., network issues)
    //             console.error(error);
    //           }
    //         }
    //       };
      
    //       if(backendIP==="")
    //         checkWebServers();
    // }, [])

    
    const contextData = {
        "selectedModule" : selectedmoduleData,
        "updateSelectedModule": setSelectedModuleData,

        "instruction" : {
            "instruction": instruction,
            "updateInstruction": setInstruction,
            "example": example,
            "updateExample" : setExample,
        },
        "testData":{
            "testMode" : testMode, 
            "updateTestMode" : setTestMode,      
            "testCode": testCode,            
            "updateTesCode": setTestCode,    
            "module":module,
            "updateModule":setModule,
            "chapter":chapter,
            "updateChapter" : setChapter,
            "subChapter":subChapter,
            "updateSubChapter":setSubChapter,
            "level":level,
            "updateLevel":setLevel,
            "updateFolderNames" : setFolderNames,
            "folderNames": folderNames,
            "title":title,
            "updateTitle": setTitile,
            // "backendIP": backendIP
        }
    }

    

    return(
        <TestContext.Provider value = {contextData}>
        {
            children
        }
        </TestContext.Provider>
    )
}

export default TestContext;