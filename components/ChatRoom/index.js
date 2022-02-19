import { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import styles from './styles.module.scss'

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();

export function ChatRoom(){

    const dummy = useRef();

    useEffect(() => {
        scrollDown()
      });    


      function scrollDown()
    {
       
        dummy.current.scrollIntoView({ behavior: 'smooth' });
   
       
    }

   
    
    const firestore = firebase.firestore();

   
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, { idField: 'id' });
    
  
    
   

    // function scrollDown()
    // {
    //     if(navigator.userAgent.indexOf("Safari") != -1) 
    // {
    //     window.scrollTo(0, document.body.scrollHeight);
    // }
       
    // }


    return (<>
        <main id="main" className={styles.main}>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

       
        <span ref={dummy}></span>
        </main>

        
    </>)
    }


    function ChatMessage(props) {

    const { text, uid, photoURL } = props.message;

    const  photoClass = photoURL === null ? `${styles.semPhoto}` : `${styles.photo}`;
    
    const messageClass = uid === auth.currentUser.uid ? `${styles.messageSent}` : `${styles.messageReceived}`;
      
    return (<>
        <div className={messageClass}>                
        <img 
            className={photoClass}
            src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} 
        />
        <p>{text}</p>
        </div>
    </>)
}