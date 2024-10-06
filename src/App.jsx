import React, { useContext } from 'react'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from './routes/PrivateRoutes'
import { AuthContext } from './context/AuthContext'
import i18next from 'i18next'
import global_uz from './translations/uz/global.json'
import global_ru from './translations/ru/global.json'

const App = () => {
    i18next.init({
        interpolation: { escapeValue: false },
        lng: "uz",
        resources: {
          uz: {
            global: global_uz
          },
          ru: {
            global: global_ru
          },
        },
      });

    const { isAuth } = useContext(AuthContext)
    return (
        <div>
            {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
        </div>
    )
}

export default App