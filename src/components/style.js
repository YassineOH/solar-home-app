import { lightTheme } from "../app/themes"
import "./style.css"
const theme = lightTheme

const myStyles = () => ({

    root: {
        margin: 0,
        padding: 0
    },

    imgHome: {
        width: 250,
    },

    mainButton: {
        padding: "2rem 2.5rem",
        fontSize: "1.5rem",
        boxShadow: `5px 20px 20px 1px #00000050`,
        border: "1px solid #000"
    },

    secondaryButton: (active) => ({
        padding: ".5rem 1.5rem",
        border: active && ".1px solid #000"
    }),


    pin: {
        position: "absolute",
        bottom: 0,
        right: -20
    },

    appBar: {
        boxShadow: `0px 1px 5px 0px ${theme.palette.primary.main} `,
        paddingBlock: "1rem",
        marginBottom: ".5rem"
    },

    myPaper: (test) => ({
        width: "95",
        marginInline: "auto",
        paddingBottom: "1.4rem",
        border: test ? "1px solid #000" : "none"
    }),


    myCard: (test) => ({
        width: "95%",
        marginInline: "auto",
        paddingInline: "0.5rem",
        border: test ? "1px solid #000" : "none"
    }),

    imgFilter: (test) => ({
        filter: test && " grayscale(100%)"
    }),

    textDisable: (test) => ({
        color: test && '#CCC'
    }),

    resultCard: {
        width: "90vw",
        border: "1px solid #000",
        padding: ".7rem 0 .5rem .7rem",
        animation: "mymove 1s ease-in-out"
    }


})

export default myStyles;