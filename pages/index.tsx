import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChatRoom } from '../components/ChatRoom'
import { SignIn } from '../components/SignIn'
import { SignOut } from '../components/SignOut'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Family Chat</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header>
          <h1>⚛️🔥💬</h1>
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
