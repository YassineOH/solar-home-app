import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import { initReactI18next } from "react-i18next";
import i18n from "i18next"
import LanguageDetector from 'i18next-browser-languagedetector';

import HttpApi from 'i18next-http-backend';

import { Home, GeoPosition, PowerConsumption, Constraints, Results, Succes } from "./routes"
import { PrimaryNav } from './components'
import { useSelector } from 'react-redux'

import myStyles from "./components/style"




i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'ar', 'fr'],
        fallbackLng: "en",
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ["cookie"]
        },
        backend: {
            loadPath: "/assets/locales/{{lng}}/translation.json"
        },

    });

const App = () => {
    const theme = useSelector(state => state.mode.mode)
    const newTheme = useSelector(state => state.lang.lang)
    const style = myStyles(createTheme(theme))
    return (
        <>
            <ThemeProvider theme={createTheme({ ...theme, ...newTheme })}>
                <CssBaseline />
                <Box sx={style.root}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PrimaryNav />}>
                                <Route index element={<Home />} />
                                <Route path="geoposition" element={<GeoPosition />} />
                                <Route path="PowerConsumption" element={<PowerConsumption />} />
                                <Route path="Constraints" element={<Constraints />} />
                                <Route path="results" element={<Results />} />
                                <Route path="succes" element={<Succes />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default App