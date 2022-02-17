import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import styles from './styles.module.scss'

import { GoSignOut } from 'react-icons/go';

export function SignOut(){
    const auth = firebase.auth();
    return auth.currentUser && (
        <button className={styles.buttonSignOut} onClick={() => auth.signOut()}><GoSignOut/> Sair</button>
      )
}