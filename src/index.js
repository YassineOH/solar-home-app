import ReactDOM from "react-dom"
import React, { Suspense } from "react"
import { Provider } from "react-redux"

import App from "./App"
import store from "./app/store"


import "./style.css"
import 'flag-icon-css/css/flag-icons.min.css'

const loading = (
    <div style={{ textAlign: "center" }}>
        <h2>Loading ...</h2>
    </div>
)

ReactDOM.render(
    <Suspense fallback={loading}>
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>,
    document.getElementById("root")
)