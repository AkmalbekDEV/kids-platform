import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FormLabel, Input, useToast } from '@chakra-ui/react'
import Logo from '../assets/logo.png'
import { TiArrowSyncOutline } from 'react-icons/ti'

const Register = () => {
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)
  const toast = useToast()

  const handleData = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Xatolik!",
        description: "Parol eng kamida 6 ta belgi yoki harfdan iborat bo'lishi kerak!",
        position: "top"
      })
      return;
    } else {
      try {
        const response = await axios.post('https://7b763fe74e4b87ba.mokky.dev/register', {
          fullName,
          email,
          password,
          paymentStatus: false,
        })
        if (response.status === 201) {
          localStorage.setItem('user-info', JSON.stringify(response.data.data))
          localStorage.setItem('token', response.data.token)
          setIsAuth(true)
        }
      } catch (error) {
        console.log(error.response.data.message);
        if (error.response.data.message) {
          toast({
            duration: 5000,
            isClosable: true,
            status: "error",
            title: "Xatolik!",
            description: "Bunday elektron pochta avval ishlatilgan!",
            position: "top"
          })
          return;
        }
      }
      toast({
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Muvaffaqiyatli o'tildi!",
        description: "Siz ro'yxatdan o'tishni muvaffaqiyatli tarzda amalga oshirdingiz! ",
        position: "top"
      })
    }

    navigate('/')
  }

  return (
    <div className='w-full h-screen flex items-center max-sm:flex-col max-sm:pt-10'>
      <div className='w-[50%] max-sm:w-full max-sm:px-10 h-screen flex items-center justify-center'>
        <form onSubmit={handleData} className='grid gap-2 w-[50%] max-sm:w-full'>
          <h1 className='text-center font-medium tracking-wide text-4xl'>Kirish</h1>
          <FormLabel mt={5}>To'liq ism</FormLabel>
          <Input required name='fullName' border={'none'} bgColor={'#f6f1ff'} p={6} placeholder="To'liq ismingiz..." borderRadius={'12px'} _active={'none'} focusBorderColor='transparent' sx={{ outline: "none", }} />
          <FormLabel mt={2}>Elektron pochta</FormLabel>
          <Input required name='email' border={'none'} bgColor={'#f6f1ff'} p={6} placeholder='Elektron pochtangiz...' borderRadius={'12px'} _active={'none'} focusBorderColor='transparent' sx={{ outline: "none", }} />
          <FormLabel mt={2}>Parol</FormLabel>
          <Input required type='password' name='password' border={'none'} bgColor={'#f6f1ff'} p={6} placeholder='Parolingiz...' borderRadius={'12px'} _active={'none'} focusBorderColor='transparent' sx={{ outline: "none", }} />
          <div className='flex justify-center'>
            <button className='bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[15px] px-10 py-3 mt-5 text-white transition-all hover:shadow-md hover:shadow-violet-500 active:bg-violet-800'>Kirish!</button>
          </div>
          <h1 className='text-sm mt-5 text-center text-violet-600'>Akkauntingiz bormi? <a className='hover:underline' href="/login">Kiring!</a></h1>
        </form>
      </div>
      <div className='w-[50%] max-sm:w-full max-sm:rounded-l-none max-sm:rounded-t-full max-sm:mt-10 h-screen flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-l-full'>
        <img src={Logo} className='w-[70%]' alt="" />
      </div>
    </div>
  )
}

export default Register