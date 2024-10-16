import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [t] = useTranslation("global")
  const [data, setData] = useState(null)
  const userInfo = localStorage.getItem('user-info');
  const parsedUserInfo = JSON.parse(userInfo)
  const userId = parsedUserInfo.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://7b763fe74e4b87ba.mokky.dev/users/${userId}`)
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const deleteResult = async (id) => {
    if (!data) return; // Agar obyekt hali yuklanmagan bo'lsa, hech narsa qilmaymiz

    // Obyektdagi results arraydan o'chirish
    const updatedResults = data.results.filter(result => result.id !== id);
    
    const updatedData = {
      ...data,
      results: updatedResults
    };

    try {
      // Yangilangan obyektni API'ga PUT so'rovi orqali yuborish
      await axios.patch(`https://7b763fe74e4b87ba.mokky.dev/users/${data.id}`, updatedData);

      // Agar so'rov muvaffaqiyatli bo'lsa, lokal state'ni yangilaymiz
      setData(updatedData);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid content-start px-10 h-[85%] overflow-y-scroll">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800 dark:text-white">
        {t("results.title")}
      </h1>

      {data && data.results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.results.map((result, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1F1D2B] shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                {result.testName}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                <strong>{t("results.score")}:</strong> {result.score} / {result.totalQuestions}
              </p>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                <strong>{t("results.totalQuestions")}:</strong> {result.totalQuestions}
              </p>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                <strong>{t("results.date")}:</strong> {result.date}
              </p>
              <button
                onClick={() => deleteResult()}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
              >
                {t("results.delete")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <p className="text-base md:text-lg font-semibold text-gray-500 dark:text-gray-300 mt-4">
            {t("results.desc")} <a href="/tests/qwertyTests" className='text-blue-500'>{t("results.testLink")}</a>
          </p>
          <img
            src="https://img.icons8.com/ios/452/empty-box.png"
            alt="No results"
            className="w-48 h-48 md:w-64 md:h-64 mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default ResultsPage;