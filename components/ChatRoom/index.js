import { useRef, useState } from "react";

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();

export function ChatRoom(){
    
    const firestore = firebase.firestore();

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

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
        <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
    }


    function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    console.log(uid,"teste")
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    //const messageClass = "trste"

    return (<>
        <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
        </div>
    </>)
}