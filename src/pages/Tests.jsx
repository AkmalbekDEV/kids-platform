import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root'); // Accessibility uchun

const TestShowPage = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [congratulationsMessage, setCongratulationsMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [data, setData] = useState(null)
  const userInfo = localStorage.getItem('user-info');
  const parsedUserInfo = JSON.parse(userInfo)
  const userId = parsedUserInfo.id;
  const [t] = useTranslation("global")

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('https://7b763fe74e4b87ba.mokky.dev/tests');
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    const getData = async () => {
      try {
        const response = await axios.get(`https://7b763fe74e4b87ba.mokky.dev/users/${userId}`)
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchTests();
    getData();
  }, []);

  const openModal = (test) => {
    setSelectedTest(test);
    setAnswers({});
    setIsModalOpen(true);
    setIsSubmitted(false);
    setScore(0);
    setShowConfetti(false);
    setCongratulationsMessage('');
    setMessageColor('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
  };

  const handleAnswerChange = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (selectedTest) {
      let correctAnswers = 0;
      selectedTest.questions.forEach((question, qIndex) => {
        if (answers[qIndex] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setIsSubmitted(true);

      // Natija rangini va Confetti ni sozlash
      if (correctAnswers === selectedTest.questions.length) {
        setCongratulationsMessage('Excellent job! You got all answers right!');
        setMessageColor('text-green-500');
        setShowConfetti(true);
      } else if (correctAnswers >= selectedTest.questions.length / 2) {
        setCongratulationsMessage('Good job! You passed the test.');
        setMessageColor('text-yellow-500');
        setShowConfetti(true);
      } else {
        setCongratulationsMessage('Keep trying! Better luck next time.');
        setMessageColor('text-red-500');
        setShowConfetti(false);
      }

      // Natijalarni saqlash
      saveTestResult(selectedTest.testName, correctAnswers, selectedTest.questions.length);
    }
  };

  const saveTestResult = async (testName, score, totalQuestions) => {
    if (!data) return;
  
    const newResult = {
      testName,
      score,
      totalQuestions,
      date: new Date().toLocaleString(),
    };
  
    const updatedResults = [...data.results, newResult];
  
    try {
      // POST so'rovini yuborish
      await axios.patch(`https://7b763fe74e4b87ba.mokky.dev/users/${data.id}`, { results: updatedResults });
      setData({ ...data, results: updatedResults }); // Yangi natijalarni yangilang
    } catch (error) {
      console.error('Xatolik yuz berdi:', error.response ? error.response.data : error.message);
    }
  };

  if (tests.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col">
        <p className="text-base md:text-lg font-semibold text-gray-500 dark:text-gray-300 mt-4">
          {t("tests.emptyTests")}
        </p>
        <img
          src="https://img.icons8.com/ios/452/empty-box.png"
          alt="No tests"
          className="w-48 h-48 md:w-64 md:h-64 mt-4"
        />
      </div>
    );
  }

  return (
    <div className="grid content-start px-16 max-md:px-10 h-[85%] overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Mavjud testlar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, testIndex) => (
          <div
            key={testIndex}
            className="bg-white dark:bg-[#1F1D2B] shadow-xl border-2 dark:border-gray-500 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">{test.testName}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {t("tests.lengthQuestion")}: {test.questions.length}
              </p>
              <button
                className="transition-all mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => openModal(test)}
              >
                {t("tests.startTest")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTest && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="relative h-[80%] max-md:mx-5 mx-auto my-16 w-full max-w-2xl p-6 bg-white dark:bg-[#1F1D2B] rounded-lg shadow-xl flex flex-col"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          {/* Test nomi - Har doim tepada ko'rinib turadi */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">{selectedTest.testName}</h2>
          </div>

          {/* Savollar - faqatgina o'rtada scroll bo'ladi */}
          <div className="flex-grow overflow-y-scroll px-2">
            {selectedTest.questions && selectedTest.questions.length > 0 ? (
              selectedTest.questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-6">
                  <p className="font-semibold mb-2 dark:text-white">
                    {t("tests.question")} {qIndex + 1}: {question.questionText}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {question.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-300 transition-colors duration-200 ${answers[qIndex] === option ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-[#927fff]'
                          }`}
                      >
                        <input
                          type="radio"
                          name={`question${qIndex}`}
                          value={option}
                          className="hidden"
                          onChange={() => handleAnswerChange(qIndex, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>...</p>
            )}
          </div>

          {/* Tugmalar - Har doim pastda ko'rinib turadi */}
          <div className="flex-shrink-0 flex justify-end mt-6">
            <button
              disabled={Object.keys(answers).length !== selectedTest.questions.length || isSubmitted}
              className={`transition-all bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${Object.keys(answers).length !== selectedTest.questions.length ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={handleSubmit}
            >
              {t("tests.finish")}
            </button>
            <button
              className="ml-4 transition-all bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              {t("tests.exit")}
            </button>
          </div>

          {isSubmitted && (
            <div className="mt-4 text-xl font-bold dark:text-white">
              {t("tests.yourResult")}: {score} / {selectedTest.questions.length}
              <p className={`mt-2 text-lg ${messageColor}`}>{congratulationsMessage}</p>
            </div>
          )}

          {showConfetti && <Confetti />}
        </Modal>
      )}
    </div>
  );
};

export default TestShowPage;