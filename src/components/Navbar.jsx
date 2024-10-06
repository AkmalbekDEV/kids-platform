import { Avatar, Button, Input, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BiChevronDown, BiLogOut, BiMenu, BiMoon, BiSun } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa6';
import { MdLanguage } from 'react-icons/md';

const Navbar = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('user-info');
  const parsedUserInfo = JSON.parse(userInfo);
  const userName = parsedUserInfo.fullName;
  const { handleThemeSwitch, theme } = useContext(ThemeContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const userId = parsedUserInfo.id;
  const toast = useToast()
  const location = useLocation() // useLocation hook'dan foydalanamiz
  const [t, i18n] = useTranslation("global")

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload();
  };

  useEffect(() => {
    onClose();
  }, [navigate])

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
        position: "top",
        isClosable: true,
        status: 'error',
        title: "Kirilmadi!",
        description: "Siz kursning to'lovini qilmaganligingiz sababli, bu sahifaga kira olmaysiz!"
      })
      onClose();
      return;
    } else {
      navigate('/books/qwertyBooks')
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

  const handleChangeLanguage = () => {
    const currentLanguage = i18n.language; // Hozirgi tilni olamiz
    const newLanguage = currentLanguage === 'uz' ? 'ru' : 'uz'; // Agar til uz bo'lsa ru ga o'zgartiramiz, aks holda uz ga o'zgartiramiz
    i18n.changeLanguage(newLanguage); // Yangi tilga o'zgartiramiz
  };

  return (
    <div className='py-8 px-16 max-md:px-10 flex items-center justify-end max-lg:justify-between'>
      <div className='dark:text-white'>
        <BiMenu onClick={onOpen} size={40} className='hidden max-lg:inline-block cursor-pointer' />
      </div>
      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={theme === 'dark' ? '#1F1D2B' : 'white'}>
          <DrawerCloseButton color={theme === 'dark' ? 'white' : 'black'} />
          <DrawerHeader color={theme === 'dark' ? 'white' : 'black'}>Menyu</DrawerHeader>
          <DrawerBody>
            <div onClick={() => navigate('/')} className='flex items-center justify-center py-5 text-xl font-medium cursor-pointer transition-all gap-5 rounded-xl hover:bg-[#F0F7FF] dark:hover:bg-[#2C2A3B] dark:text-white'>
              {t("sidebar.link1")}
            </div>
            <div onClick={handleBooks} className='flex items-center justify-center py-5 text-xl font-medium cursor-pointer transition-all gap-5 rounded-xl hover:bg-[#F0F7FF] dark:hover:bg-[#2C2A3B] dark:text-white'>
              {t("sidebar.link2")}
            </div>
            <div onClick={handleTests} className='flex items-center justify-center py-5 text-xl font-medium cursor-pointer transition-all gap-5 rounded-xl hover:bg-[#F0F7FF] dark:hover:bg-[#2C2A3B] dark:text-white'>
              {t("sidebar.link3")}
            </div>
            <div onClick={handleResults} className='flex items-center justify-center py-5 text-xl font-medium cursor-pointer transition-all gap-5 rounded-xl hover:bg-[#F0F7FF] dark:hover:bg-[#2C2A3B] dark:text-white mb-5'>
              {t("sidebar.link4")}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div className='flex items-center gap-5'>
        <button
          onClick={handleThemeSwitch}
          className="p-6 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-[#1F1D2B] transition-all"
        >
          <div className='flex justify-center items-center'>
            <BiMoon
              style={{
                opacity: theme === "light" ? 1 : 0,
                position: "absolute",
                transition: "opacity 0.3s ease",
                color: 'black',
              }}
              size={25}
            />
            <BiSun
              style={{
                opacity: theme === "light" ? 0 : 1,
                position: "absolute",
                transition: "opacity 0.3s ease",
                color: 'white',
              }}
              size={25}
            />
          </div>
        </button>
        <Menu>
          <MenuButton
            sx={{
              bgColor: theme === "dark" ? "#1F1D2B" : "",
              "&:hover": {
                bgColor: theme === "dark" ? "#2C2A3B" : "#e2e8f0",
              },
              "&:focus-visible": {
                bgColor: theme === "dark" ? "#2C2A3B" : "#e2e8f0",
              },
              "&:focus": {
                boxShadow: "none",
              }
            }}
            as={Button}
            p={6}
            rightIcon={<div className='dark:text-white'><BiChevronDown size={30} /></div>}
          >
            <div className='flex items-center gap-3'>
              <Avatar w={8} h={8} cursor={'pointer'} />
              <h1 className='text-2xl dark:text-white font-medium max-sm:hidden'>{userName}</h1>
            </div>
          </MenuButton>
          <MenuList bg={theme === 'dark' ? '#1F1D2B' : 'white'} borderColor={theme === 'dark' ? 'gray.600' : "none"}>
            <MenuItem bg={theme === 'dark' ? '#1F1D2B' : 'white'} textColor={theme === 'dark' ? 'white' : 'black'} display={'flex'} alignItems={'center'} gap={2} _hover={theme === 'dark' ? { backgroundColor: "#2C2A3B" } : { backgroundColor: "#ffe7e7" }} onClick={handleLogOut}><BiLogOut /> {t("header.logOut")}</MenuItem>
            <MenuItem bg={theme === 'dark' ? '#1F1D2B' : 'white'} textColor={theme === 'dark' ? 'white' : 'black'} display={'flex'} alignItems={'center'} gap={2} _hover={theme === 'dark' ? { backgroundColor: "#2C2A3B" } : { backgroundColor: "#ffe7e7" }} onClick={handleChangeLanguage}><MdLanguage /> {t("header.changeLang")}</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;