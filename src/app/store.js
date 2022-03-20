import { createSlice, configureStore } from "@reduxjs/toolkit"
import cookies from "js-cookie"

import { lightTheme } from "./themes"
import themingLang from "./themes"


const coordsSlice = createSlice({
    name: "coords",
    initialState: { coords: { lat: 33.9716, lng: -6.8498 } },
    reducers: {
        changeCoords(state, action) {
            state.coords = action.payload
        }
    }
})

const monthlyConsumptionSlice = createSlice({
    name: "monthlyConsumption",
    initialState: { typeOfData: "estimated", data: Array(12).fill(0) },
    reducers: {
        setMonthlyConsumption(state, action) {
            state.data = action.payload
        },

        setTypeOfData(state, action) {
            state.typeOfData = action.payload
        }
    }

})

const modeOfInstallationSlice = createSlice({
    name: "modeOfInstallation",
    initialState: { mode: "" },
    reducers: {
        setModeOfInstallation(state, action) {
            state.mode = action.payload
        }
    }
})


const specificEnergySlice = createSlice({
    name: "specificEnergy",
    initialState: { specificEnergy: 0 },
    reducers: {
        setSpecificEnergy(state, action) {
            state.specificEnergy = action.payload
        }
    }
})

const progessSlice = createSlice({
    name: "progress",
    initialState: { geoPosition: false, powerConsumption: false, mode: false },
    reducers: {
        setProgressGeo(state, action) {
            state.geoPosition = action.payload
        },
        setProgressPower(state, action) {
            state.powerConsumption = action.payload
        },
        setProgressMode(state, action) {
            state.mode = action.payload
        },
    }
})


const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: lightTheme
    },
    reducers: {
        setLightTheme(state, action) {
            state.mode = action.payload
        },

        setDarkTheme(state, action) {
            state.mode = action.payload
        },
    }

})

const languageSlice = createSlice({
    name: "lang",
    initialState: { lang: themingLang(cookies.get("i18next")) || themingLang("en") },
    reducers: {
        changeLang(state, action) {
            state.lang = action.payload
        }
    }
})



export const coordsActions = coordsSlice.actions
export const monthlyConsumptionActions = monthlyConsumptionSlice.actions
export const modeOfInstallationActions = modeOfInstallationSlice.actions
export const progressAction = progessSlice.actions
export const specificEnergyActions = specificEnergySlice.actions
export const modeActions = modeSlice.actions
export const languageActions = languageSlice.actions

const store = configureStore({
    reducer: {
        coords: coordsSlice.reducer,
        monthlyConsumption: monthlyConsumptionSlice.reducer,
        modeOfInstallation: modeOfInstallationSlice.reducer,
        progress: progessSlice.reducer,
        specificEnergy: specificEnergySlice.reducer,
        mode: modeSlice.reducer,
        lang: languageSlice.reducer

    }
})

export default store;