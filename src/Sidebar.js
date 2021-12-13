import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';
import db from './firebase';

function Sidebar() {

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot( (snapshot) =>
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data(),
            }))
         )
        );
    },[])

    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name');
        console.log(channelName);
        if(channelName) {
            db.collection('channels').add({
                channelName: channelName,
            })
        }
    }

    return <div className="sidebar">
       
        <div className="sidebar__top">
            <img className="sidebar__logo" src="https://1000merken.com/wp-content/uploads/2021/02/Discord-Logo.png" />
            <h3>DISCORD  </h3>
            <ExpandMoreIcon />
        </div>

        <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
                <div className="sidebar__header">
                    <ExpandMoreIcon />
                    <h4>Text Channels</h4>
                </div>
                <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
            </div>

            <div className="sidebar__channelsList">
                {channels.map( ({ id, channel }) => (
                    <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                ))}
            </div>
        </div>

        <div className="sidebar__voice">
            <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large" />
            <div className="sidebar__voiceInfo">
                <h3>Voice Connected</h3>
                <p>Stream</p>
            </div>
            <div className="sidebar__voiceIcons">
                <InfoIcon />
                <CallIcon />
            </div>
        </div>

        <div className="sidebar__profile">
            <Avatar onClick={() => firebase.auth().signOut().then(()=> {console.log("Log Out Successfully");}).catch( (error) => {console.log(error);})} src={user.photo}/>
            <div className="sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0,5)}</p>
            </div>
            <div className="sidebar__profileIcons">
                <MicIcon />
                <HeadphonesIcon />
                <SettingsIcon />
            </div>
        </div>
    </div>
    
}

export default Sidebar
