import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CssBaseline } from '@mui/material'

import { Home, GeoPosition, PowerConsumption, Constraints, Results } from "./routes"
import { PrimaryNav } from './components'


const App = () => {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrimaryNav />}>
                        <Route index element={<Home />} />
                        <Route path="geoposition" element={<GeoPosition />} />
                        <Route path="PowerConsumption" element={<PowerConsumption />} />
                        <Route path="Constraints" element={<Constraints />} />
                        <Route path="results" element={<Results />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App