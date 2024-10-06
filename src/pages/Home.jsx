import React from 'react'
import Banner from '../components/Banner'
import Messages from '../components/Messages'
import Payment from '../components/Payment'
import Games from '../components/Games'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const [t] = useTranslation("global")

  return (
    <div className='px-16 max-md:px-10 h-[85%] overflow-y-scroll'>
      <Banner />
      <div className='grid gap-5 mt-8'>
        <h1 className='text-2xl font-medium dark:text-white max-lg:text-center max-lg:text-3xl'>{t("main.title")}</h1>
        <div className='flex items-center flex-wrap justify-between gap-8 max-lg:justify-center max-lg:gap-6'>
          <Payment />
          <Messages />
          <Games />
        </div>
      </div>
    </div>
  )
}

export default Home