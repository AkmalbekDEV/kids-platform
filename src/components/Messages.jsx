import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiSettings } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';

const Messages = () => {
  const [data, setData] = useState(null) // Default value set to null
  const userInfo = localStorage.getItem('user-info');
  const parsedUserInfo = JSON.parse(userInfo)
  const userId = parsedUserInfo.id;
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
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

  return (
    <div
      onClick={handleResults}
      className='dark:bg-[#1F1D2B] rounded-xl flex items-center justify-center bg-white w-[320px] max-lg:w-[280px] max-sm:w-full h-[280px] shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:border border-[#0077FF] hover:border-[#0077FF]'
    >
      <div className='grid gap-3 px-5'>
        <div className='flex justify-center'>
          <CiSettings size={80} color='#0077FF' />
        </div>
        <h1 className='text-xl text-center text-blue-500'>{t("main.results")}</h1>
        <h1 className='text-sm text-center text-gray-400'>
          {t("main.resultsDesc")}
        </h1>
      </div>
    </div>
  );
};

export default Messages;