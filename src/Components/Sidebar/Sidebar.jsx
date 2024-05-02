import React, { useContext, useState } from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets.js'
import { context } from '../../context/Context.jsx';

const Sidebar = () => {

    const [extended , setExtended] = useState(false);
    const {onSent , prevPrompts , setRecentPrompt , newChat} = useContext(context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        onSent(prompt)
    }

return (
<div className='sidebar min-h-screen inline-flex flex-col justify-between'>
    <div className="top">
        <img onClick={()=> setExtended(prev => !prev)} className='menu w-7 pl-2.5 cursor-pointer block' src={assets.menu_icon} alt="Menu Icon" />
        <div onClick={()=> newChat()} className="new-chat mt-12 inline-flex items-center gap-2.5 cursor-pointer">
            <img className='w-5' src={assets.plus_icon} alt="Plus Icon" />
            {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? 
        <div className="recent flex flex-col">
        <p className="recent-title mt-7 mb-5">Recent</p>
        {prevPrompts.map((recent , i)=>{
            return <div onClick={()=> loadPrompt(recent)} key={i} className="recent-entry flex items-start gap-2.5 p-2.5 pr-10 cursor-pointer">
                        <img className='w-5' src={assets.message_icon} alt="Message Icon" />
                        <p>{recent.slice(0,18)} ...</p>
                    </div>
        })}
        
        </div>
        :null
        }
    </div>
    <div className="bottom flex flex-col">
        <div className="recent-entry flex items-start gap-2.5 p-2.5 cursor-pointer">
            <img className='w-5' src={assets.question_icon} alt="Question Icon" />
            {extended ? <p>Help</p> : null}
        </div>
        <div className="recent-entry flex items-start gap-2.5 p-2.5 cursor-pointer">
            <img className='w-5' src={assets.history_icon} alt="History Icon" />
            {extended ? <p>Activity</p> : null}
        </div>
        <div className="recent-entry flex items-start gap-2.5 p-2.5 cursor-pointer">
            <img className='w-5' src={assets.setting_icon} alt="Setting Icon" />
            {extended ? <p>Setting</p> : null}
        </div>
    </div>
</div>
)
}

export default Sidebar
