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
          <button className="sign-in" onClick={signInWithGoogle}>Entrar com Google</button>
          <p>Nao dependemos mais do WhatsApp ou outro aplicativo de menssagem</p>
        </div>
      )
}