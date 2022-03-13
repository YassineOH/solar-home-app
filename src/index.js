import ReactDOM from "react-dom"
import React from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from '@mui/material/styles'

import App from "./App"
import store from "./app/store"
import { lightTheme } from "./app/themes"

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
)