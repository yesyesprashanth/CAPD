import React, {createContext, useState} from 'react';


const TestContext = createContext(null);

export function TestContextProvider({children}){
    const [testCode, setTestCode] = useState(1);
    const [instruction, setInstruction] = useState("");
    const [example, setExample] = useState("");

    const contextData = {
        "testCode": testCode,
        "updateTesCode": setTestCode,
        "instruction": instruction,
        "updateInstruction": setInstruction,
        "example": example,
        "updateExample" : setExample
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