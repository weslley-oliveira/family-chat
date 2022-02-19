import styles from '../styles/Home.module.scss'
import Head from 'next/head'

import { GiThreeFriends } from 'react-icons/gi';
import { RiSendPlaneFill } from 'react-icons/ri';

import { ChatRoom } from '../components/ChatRoom'
import { SignIn } from '../components/SignIn'
import { SignOut } from '../components/SignOut'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export function Home(){

  useEffect(() => {
    checkLast()   
  });    
  
  const auth  = firebase.auth();
  const user = useContext(AuthContext); 
  const [formValue, setFormValue] = useState('');

  const [lastUser, setLastUser] = useState("");

    
    function checkLast() {

        if(messages){
            let newArray = messages
            let lastElement = newArray[newArray.length - 1]

            if(lastElement){
                setLastUser(lastElement.uid)
            }
        }
    }   
    

  const firestore = firebase.firestore();

    
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, { idField: 'id' });
 

  const sendMessage = async (e) => {
    e.preventDefault();        
    
    const { uid, photoURL }  = auth.currentUser;

    if(lastUser !== uid){
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
            })
    } else {
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL: null
            })
    }
    setFormValue('');
}

 
  return (
    <div>
      <Head>
        <title>Family Chat</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <main className={styles.app}>

        {user ?
        <header className={styles.header}>
          <div>
            <div className={styles.logo}>
              <span><GiThreeFriends/></span>
            </div>            
            <h1>Family Chat</h1>
          </div>
          <SignOut />
        </header>
        :""}

        <section className={styles.section}>
          {user ? <ChatRoom/> : <SignIn />}
        </section>
        {user ?
        <form className={styles.form} onSubmit={sendMessage}>
          <input 
              value={formValue} 
              onChange={(e) => setFormValue(e.target.value)} 
              placeholder="Type a message" 
          />
          <button type="submit" disabled={!formValue}><RiSendPlaneFill/></button>

        </form>
        :""}
      </main>      
    </div>
  )
}

export default Home
