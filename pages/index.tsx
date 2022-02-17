import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import Head from 'next/head'
import Image from 'next/image'

import { ChatRoom } from '../components/ChatRoom'
import { SignIn } from '../components/SignIn'
import { SignOut } from '../components/SignOut'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home: NextPage = () => {

  const user = useContext(AuthContext);  

  return (
    <div>
      <Head>
        <title>Family Chat</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header>
          <h1>⚛️Family Chat</h1>
          <SignOut />
        </header>

        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </main>      
    </div>
  )
}

export default Home
