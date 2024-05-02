import { createContext, useEffect, useState } from "react";
import runChat from "../config/gemini";

export const context = createContext();

const ContextProvider = ({children})=>{

    const [input , setInput] = useState("");
    const [recentPrompt , setRecentPrompt] = useState("");
    const [prevPrompts , setPrevPrompts] = useState([]);
    const [showResults , setShowResults] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const [resultData , setResultData] = useState("");

    const delayLines = (index , nextWord)=>{
        setTimeout(function(){
            setResultData(prev => prev+nextWord)
        },75*index)
    }

    const newChat = ()=>{
        setIsLoading(false)
        setShowResults(false)
    }

    const onSent = async (prompt)=>{
    
        setIsLoading(true);
        setShowResults(true);
        setResultData("");
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev => [...prev , input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }
        // setRecentPrompt(input);
        // setPrevPrompts(prev => [...prev , input])
        // const response = await runChat(input);
        // ! handle bold words so define variable to split on **
        let responseArray = response.split('**');
        //! define new arr and check if i=0 or i=even ? nothing happen
        //! if odd concat with <b></b>
        let newResponse ="";

        for (let i = 0; i < responseArray.length; i++) {
            if(i===0 || i%2 !==1){
                newResponse+= responseArray[i]
            }else{
                newResponse+= "<b>"+responseArray[i]+"</b>"
            }
        }
        //! take old arr and define another one to start lines
        let newerResponse = newResponse.split('*').join("<br/>");
        //! show word by word so split each word
        //! then i looped on it and take each word to pass it to delayLines()
        //! and finally call delayLines and pass it index to duration and nextWord with space
        let finalResponse = newerResponse.split(" ");
        for(let i=0 ; i<finalResponse.length ; i++){
            const nextWord = finalResponse[i]
            delayLines(i,nextWord+" ")
        }

        setIsLoading(false);
        setInput("");

    }

    const contextValue = {
        input,
        setInput,
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResults,
        isLoading,
        resultData,
        newChat
    }

return (
    <context.Provider value={contextValue}>
        {children}
    </context.Provider>
)
}

export default ContextProvider;