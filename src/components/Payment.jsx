import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCoins } from 'react-icons/fa6';

const Payment = () => {
    const [data, setData] = useState(null); // Initial holatda null
    const userInfo = localStorage.getItem('user-info');
    const parsedUserInfo = JSON.parse(userInfo);
    const userId = parsedUserInfo.id;
    const toast = useToast();
    const [t] = useTranslation("global")

    const getData = async () => {
        try {
            const res = await axios.get(`https://7b763fe74e4b87ba.mokky.dev/users/${userId}`);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Shartli render uchun o'zgaruvchilar
    const truePayment = <h1 className='text-xl text-center text-green-500'>{t("main.truePaymentStatus")}</h1>;
    const falsePayment = <h1 className='text-xl text-center text-red-500'>{t("main.falsePaymentStatus")}</h1>;
    const falseDesc = <h1 className='text-sm text-center text-gray-400'>{t("main.falsePaymentDesc")}</h1>;
    const trueDesc = <h1 className='text-sm text-center text-gray-400'>{t("main.truePaymentDesc")}</h1>;

    // Data mavjudligini tekshirish
    if (data === null) {
        return (
            <div className='rounded-xl dark:bg-[#1F1D2B] flex items-center justify-center bg-white w-[320px] h-[280px] shadow-xl'>
                <h1 className='text-xl text-center text-gray-500'>Loading...</h1>
            </div>
        );
    }

    return (
        <div className='rounded-xl dark:bg-[#1F1D2B] flex items-center justify-center bg-white w-[320px] max-lg:w-[280px] max-sm:w-full h-[280px] shadow-xl'>
            <div className='grid gap-3 px-8'>
                <div className='flex items-center justify-center'>
                    <FaCoins size={70} color='#0077FF' />
                </div>
                <div>{data.paymentStatus === false ? falsePayment : truePayment}</div>
                <div>{data.paymentStatus === false ? falseDesc : trueDesc}</div>
            </div>
        </div>
    );
};

export default Payment;
