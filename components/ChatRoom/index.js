import { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

import styles from './styles.module.scss'

import { RiSendPlaneFill } from 'react-icons/ri';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();

export function ChatRoom(){

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      });    
    
    const firestore = firebase.firestore();

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main className={styles.main}>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

        </main>

        <form className={styles.form} onSubmit={sendMessage}>

        <input 
            value={formValue} 
            onChange={(e) => setFormValue(e.target.value)} 
            placeholder="Type a message" />

        <button type="submit" disabled={!formValue}><RiSendPlaneFill/></button>

        </form>
    </>)
    }


    function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? `${styles.messageSent}` : `${styles.messageReceived}`;
      
    return (<>
        <div className={messageClass}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
        </div>
    </>)
}