import { NextPage } from 'next'

import styles from '../styles/Home.module.css'
import HomeContainer from './home/index'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeContainer />
      </main>
    </div>
  )
}

export default Home
