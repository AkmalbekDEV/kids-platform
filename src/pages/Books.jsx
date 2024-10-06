import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])
  const [t] = useTranslation("global")

  const getData = async () => {
    try {
      const response = await axios.get('https://7b763fe74e4b87ba.mokky.dev/books')
      setBooks(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='grid content-start gap-10 px-16 max-md:px-10 h-[85%] overflow-y-scroll'>
      <div className='flex items-center justify-center'>
        <div className='grid gap-3'>
          <h1 className='text-5xl font-medium tracking-wide text-center dark:text-white'>{t("books.title")}</h1>
          <p className='text-xl text-gray-400 px-56 max-lg:px-32 max-md:px-0 text-center'>{t("books.desc")}</p>
        </div>
      </div>
      <div className='flex items-center flex-wrap justify-center gap-8'>
        {books && books.map((item, index) => (
          <Link target='_blank' to={item.link} key={index} className='p-5 w-[300px] h-[400px] rounded-lg border-2 border-gray-300 dark:border-gray-400'>
            <img src={item.img} alt="book" className='h-[100%] w-full object-cover rounded-lg' />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Books