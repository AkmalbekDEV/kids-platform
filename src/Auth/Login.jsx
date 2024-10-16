import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Logo from '../assets/logo.png'
import { FormLabel, Input, useToast } from '@chakra-ui/react'

const Login = () => {
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)
  const toast = useToast()

  const handleData = async (e) => {
    e.preventDefault()
    const Email = e.target.email.value
    const Password = e.target.password.value

    try {
      const response = await axios.post('https://7b763fe74e4b87ba.mokky.dev/auth', {
        email: Email,
        password: Password
      })
      if (response.status === 201) {
        setIsAuth(true);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user-info', JSON.stringify(response.data.data))
      }
    } catch (error) {
      console.error(error.response.data.message);
      if (error.response.data.message) {
        toast({
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Xatolik!",
          description: "Pochta manzili yoki parol xato, qaytadan urining!",
          position: "top"
        })
        return;
      }
    }

    if (e.target.email.value === "") {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Barcha ma'lumotlar kiritilmagan",
        description: "Barcha ma'lumotlarni kiriting va qaytadan urining!",
        position: "top"
      })
      return;
    } else if (!Email.includes(".com")) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Pochta manzili xato",
        description: "Barcha ma'lumotlarni to'g'ri kiriting va qaytadan urining!",
        position: "top"
      })
    } else {
      toast({
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Muvaffaqiyatli kiritildi!",
        description: "Siz akkauntga kirishni muvaffaqiyatli amalga oshirdingiz!",
        position: "top"
      })
    }

    navigate('/')
  }

  useEffect(() => {
    toast({
      duration: 4000,
      position: 'top',
      status: 'info',
      title: `Sizga taqdim etilgan login va parolni kiriting
      (Введите логин и пароль, предоставленные вам).
      `,
    })
  }, []);

  return (
    <div className='w-full h-screen flex items-center max-sm:flex-col max-sm:pt-10'>
      <div className='w-[50%] max-sm:w-full max-sm:px-10 h-screen flex items-center justify-center'>
        <form onSubmit={handleData} className='grid gap-2 w-[50%] max-sm:w-full'>
          <h1 className='text-center font-medium tracking-wide text-4xl'>Kirish</h1>
          <FormLabel mt={5}>Elektron pochtangiz</FormLabel>
          <Input name='email' border={'none'} bgColor={'#f6f1ff'} p={6} placeholder='Email pochta...' borderRadius={'12px'} _active={'none'} focusBorderColor='transparent' sx={{ outline: "none", }} />
          <FormLabel mt={2}>Parolingiz</FormLabel>
          <Input name='password' border={'none'} bgColor={'#f6f1ff'} p={6} placeholder='Parol...' borderRadius={'12px'} _active={'none'} focusBorderColor='transparent' sx={{ outline: "none", }} />
          <div className='flex justify-center'>
            <button className='bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[15px] px-10 py-3 mt-5 text-white transition-all hover:shadow-md hover:shadow-violet-500 active:bg-violet-800'>Kirish!</button>
          </div>
        </form>
      </div>
      <div className='w-[50%] max-sm:w-full max-sm:rounded-l-none max-sm:rounded-t-full max-sm:mt-10 h-screen flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-l-full'>
        <img src={Logo} className='w-[70%]' alt="" />
      </div>
    </div>
  )
}

export default Login