import { createSlice, configureStore } from "@reduxjs/toolkit"

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
    initialState: Array(12).fill(0),
    reducers: {
        setMonthlyConsumption(state, action) {
            state.monthlyConsumption = action.payload
        }
    }

})

export const coordsActions = coordsSlice.actions
export const monthlyConsumptionActions = monthlyConsumptionSlice.actions

const store = configureStore({
    reducer: {
        coords: coordsSlice.reducer,
        monthlyConsumption: monthlyConsumptionSlice.reducer
    }
})

export default store;