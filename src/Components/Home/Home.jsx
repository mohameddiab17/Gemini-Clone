import React, { useContext } from 'react';
import './Home.css';
import { assets } from '../../assets/assets.js';
import { context } from '../../context/Context.jsx';

const Main = () => {

    const onKeyDown = (e)=>{
        if (e.key === "Enter") {
            onSent()
        }
    }

    const {onSent , recentPrompt , showResults , isLoading , resultData , input , setInput} = useContext(context);

return (
<div className='main flex-1 min-h-screen pb-4 relative'>
    <div className="nav flex items-center justify-between text-xl p-5">
        <p>Gemini</p>
        <img className='w-10 rounded-full' src={assets.user_icon} alt="User Icon" />
    </div>
    <div className="main-container max-w-4xl m-auto">
        {!showResults ? 
        <>
        <div className="greet mx-0 p-5 font-medium">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today</p>
        </div>
        <div className="cards gap-2.5 px-5 py-10 grid md:grid-cols-4 mb-24">
            <div className="card h-52 p-4 rounded-xl relative cursor-pointer">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img className='w-9 p-1.5 absolute rounded-3xl bottom-3 right-3 bg-white' src={assets.compass_icon} alt="Compass Icon" />
            </div>
            <div className="card h-52 p-4 rounded-xl relative cursor-pointer">
                <p>Briefly summarize this concept: urban planning</p>
                <img className='w-9 p-1.5 absolute rounded-3xl bottom-2 right-2 bg-white' src={assets.bulb_icon} alt="Blub Icon" />
            </div>
            <div className="card h-52 p-4 rounded-xl relative cursor-pointer">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img className='w-9 p-1.5 absolute rounded-3xl bottom-3 right-3 bg-white' src={assets.message_icon} alt="Message Icon" />
            </div>
            <div className="card h-52 p-4 rounded-xl relative cursor-pointer">
                <p>Improve the readability of the following code</p>
                <img className='w-9 p-1.5 absolute rounded-3xl bottom-3 right-3 bg-white' src={assets.code_icon} alt="Code Icon" />
            </div>
            
        </div>
        </>
        :
        <div className="result">
            <div className="result-title flex items-center my-10 mx-0 gap-5">
                <img className='w-10 rounded-full' src={assets.user_icon} alt="User Icon" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data flex items-start gap-5">
                <img src={assets.gemini_icon} alt="Gemini Icon" />
                {isLoading ?
                <div className="loader w-full flex flex-col gap-2.5">
                    <hr className='rounded border-none h-5' />
                    <hr className='rounded border-none h-5' />
                    <hr className='rounded border-none h-5' />
                </div>
                :
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>
        </div>
        }
        <div className='absolute bottom-0 w-full max-w-4xl m-auto px-5 mt-12 mb-5'>
            <div className="search-box flex items-center justify-between gap-5 py-2.5 px-5 ">
                <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={onKeyDown} className='flex-1 bg-transparent border-none outline-none p2 text-lg' type="text" placeholder='Enter a prompt here' />
                <div className='flex items-center gap-4'>
                    <img className='w-6 cursor-pointer' src={assets.gallery_icon} alt="Gallery Icon" />
                    <img className='w-6 cursor-pointer' src={assets.mic_icon} alt="Microphone Icon" />
                    <img onClick={()=> onSent()} className='w-6 cursor-pointer' src={assets.send_icon} alt="Send Icon" />
                </div>
            </div>
            <p className='text text-sm my-2 mx-auto text-center font-light'>
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
        </div>
    </div>
</div>
)
}

export default Main;
