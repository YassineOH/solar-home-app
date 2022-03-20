import { amber } from "@mui/material/colors"



export const darkTheme = {
    palette: {
        mode: "dark",
        primary: {
            main: amber[500]
        },

        background: {
            default: "#1E1E1E"
        }
    },

}

export const lightTheme = {
    palette: {
        mode: "light",
        primary: {
            main: amber[500]
        },
        background: {
            default: "#FFF"
        }
    },
}


const themingLang = (lang, mode) => (
    {

        typography: {
            fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "'Roboto', 'Helvetica', 'Arial', sans-serif"
        }
    }
)


export default themingLang;