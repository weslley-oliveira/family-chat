import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import styles from './styles.module.scss'


export function SignIn(){
    const auth = firebase.auth();
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    
      return (
        <div className={styles.signIn}>
          <button className="sign-in" onClick={signInWithGoogle}>SignIn with Google</button>
          <p>We no longer needed WhatsApp or another messaging app hahaha</p>
        </div>
      )
}