import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CgHello } from 'react-icons/cg'

const Banner = () => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'))
    const userName = userInfo?.fullName || 'Foydalanuvchi'
    const userId = userInfo?.id
    const [state, setState] = useState([])
    const [t] = useTranslation("global")

    const getData = async () => {
        try {
            const response = await axios.get(`https://7b763fe74e4b87ba.mokky.dev/users/${userId}`)

            // Ma'lumotni massiv ekanligini tekshirish
            const data = Array.isArray(response.data) ? response.data : [response.data]

            setState(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userId) {
            getData()
        }
    }, [userId])

    return (
        <div className='w-full rounded-xl flex items-center justify-between p-8 max-md:p-7 bg-[#0077FF]'>
            <div className='grid gap-3 max-sm:text-center'>
                <h1 className='text-5xl max-md:text-4xl max-sm:text-3xl font-bold text-white flex items-center gap-5'>
                    {t("main.bannerTitle")}, {userName} <CgHello color='yellow' className='max-sm:hidden' />
                </h1>
                <h1 className='text-lg max-sm:text-sm text-white'>
                    {t("main.bannerDesc")}
                </h1>
            </div>
        </div>
    )
}

export default Banner
