import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import { Link, useNavigate, useLocation } from 'react-router-dom' // useLocation import qilindi
import { GoHomeFill } from 'react-icons/go'
import { BiBook } from 'react-icons/bi'
import { MdLocalMovies, MdQuestionAnswer } from 'react-icons/md'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { PiExam } from 'react-icons/pi'
import { FcAnswers } from 'react-icons/fc'
import { SiAnswer } from 'react-icons/si'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const [data, setData] = useState(null) // Default value set to null
  const userInfo = localStorage.getItem('user-info');
  const parsedUserInfo = JSON.parse(userInfo)
  const userId = parsedUserInfo.id;
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation() // useLocation hook'dan foydalanamiz
  const [t] = useTranslation("global")

  const getData = async () => {
    try {
      const res = await axios.get(`https://7b763fe74e4b87ba.mokky.dev/users/${userId}`)
      setData(res.data)
    } catch (error) {
      console.log(error);
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Xato!",
        description: "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi."
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleBooks = (e) => {
    e.preventDefault()

    // Check if data is available
    if (!data || data.paymentStatus === undefined) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Xato!",
        description: "Ma'lumot olishda xatolik yuz berdi."
      })
      return;
    }

    if (data.paymentStatus === false) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Kirilmadi!",
        description: "Siz kursning to'lovini qilmaganligingiz sababli, bu sahifaga kira olmaysiz!"
      })
      return;
    } else {
      navigate('/books/qwertyBooks')
    }
  }

  const handleMovies = (e) => {
    e.preventDefault()

    // Check if data is available
    if (!data || data.paymentStatus === undefined) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Xato!",
        description: "Ma'lumot olishda xatolik yuz berdi."
      })
      return;
    }

    if (data.paymentStatus === false) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Kirilmadi!",
        description: "Siz kursning to'lovini qilmaganligingiz sababli, bu sahifaga kira olmaysiz!"
      })
      return;
    } else {
      navigate('/movies/qwertyMovies')
    }
  }

  const handleTests = (e) => {
    e.preventDefault()

    // Check if data is available
    if (!data || data.paymentStatus === undefined) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Xato!",
        description: "Ma'lumot olishda xatolik yuz berdi."
      })
      return;
    }

    if (data.paymentStatus === false) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Kirilmadi!",
        description: "Siz kursning to'lovini qilmaganligingiz sababli, bu sahifaga kira olmaysiz!"
      })
      return;
    } else {
      navigate('/tests/qwertyTests')
    }
  }

  const handleResults = (e) => {
    e.preventDefault()

    // Check if data is available
    if (!data || data.paymentStatus === undefined) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Xato!",
        description: "Ma'lumot olishda xatolik yuz berdi."
      })
      return;
    }

    if (data.paymentStatus === false) {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: "Kirilmadi!",
        description: "Siz kursning to'lovini qilmaganligingiz sababli, bu sahifaga kira olmaysiz!"
      })
      return;
    } else {
      navigate('/results/qwertyResults')
    }
  }

  // Agar `location.pathname` siz tanlagan route'ga teng bo'lsa, rangni o'zgartiradi
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className='w-[20%] h-screen bg-white dark:bg-[#1F1D2B] rounded-r-2xl grid content-start max-lg:hidden'>
      <img src={Logo} alt="" className='px-10' />
      <Link 
        to={'/'} 
        className={`transition-all text-xl font-medium w-full flex items-center px-12 gap-3 py-4 ${
          isActiveLink('/') ? 'text-[#0077FF] border-l-8 border-[#0077FF] bg-[#F0F7FF] dark:bg-transparent' : 'text-gray-700 dark:text-white hover:text-[#0077FF] dark:hover:text-[#0077FF] hover:border-l-8 hover:border-[#0077FF] hover:bg-[#F0F7FF] dark:hover:bg-transparent'
        }`}
      >
        <GoHomeFill size={40} />
        {t("sidebar.link1")}
      </Link>
      <div 
        onClick={handleBooks} 
        className={`cursor-pointer transition-all text-xl font-medium w-full flex items-center px-12 gap-3 py-4 ${
          isActiveLink('/books/qwertyBooks') ? 'text-[#0077FF] border-l-8 border-[#0077FF] bg-[#F0F7FF] dark:bg-transparent' : 'text-gray-700 dark:text-white hover:text-[#0077FF] dark:hover:text-[#0077FF] hover:border-l-8 hover:border-[#0077FF] hover:bg-[#F0F7FF] dark:hover:bg-transparent'
        }`}
      >
        <BiBook size={40} />
        {t("sidebar.link2")}
      </div>
      <div 
        onClick={handleTests} 
        className={`cursor-pointer transition-all text-xl font-medium w-full flex items-center px-12 gap-3 py-4 ${
          isActiveLink('/tests/qwertyTests') ? 'text-[#0077FF] border-l-8 border-[#0077FF] bg-[#F0F7FF] dark:bg-transparent' : 'text-gray-700 dark:text-white hover:text-[#0077FF] dark:hover:text-[#0077FF] hover:border-l-8 hover:border-[#0077FF] hover:bg-[#F0F7FF] dark:hover:bg-transparent'
        }`}
      >
        <PiExam size={40} />
        {t("sidebar.link3")}
      </div>
      <div 
        onClick={handleResults} 
        className={`cursor-pointer transition-all text-xl font-medium w-full flex items-center px-12 gap-3 py-4 ${
          isActiveLink('/results/qwertyResults') ? 'text-[#0077FF] border-l-8 border-[#0077FF] bg-[#F0F7FF] dark:bg-transparent' : 'text-gray-700 dark:text-white hover:text-[#0077FF] dark:hover:text-[#0077FF] hover:border-l-8 hover:border-[#0077FF] hover:bg-[#F0F7FF] dark:hover:bg-transparent'
        }`}
      >
        <MdQuestionAnswer size={40} />
        {t("sidebar.link4")}
      </div>
    </div>
  )
}

export default Sidebar