import { createTheme } from "@mui/material/styles"
import store from "../app/store"
import { alpha } from "@mui/material"


const mode = store.getState().mode.mode


export const theme = createTheme(mode)


const myStyles = (theme) => {

    let themeColor;
    if (theme.palette.mode === "dark") {
        themeColor = "#EEE"
    } else {
        themeColor = "#111"
    }
    return {
        root: {
            margin: 0,
            maxWidth: 600,
            padding: 0,
            marginInline: "auto",
            boxSizing: "border-box",
            backgroundImage: "none",
            backgroundColor: `${theme.palette.background.default}`,
        },

        imgHome: {
            width: 250,
        },

        mainButton: {
            padding: "2rem 2.5rem",
            fontSize: "1.5rem",
            boxShadow: `5px 20px 15px 1px ${alpha(themeColor, 0.15)}`,
            border: `1px solid  ${alpha(themeColor, .2)}`,


        },

        secondaryButton: (active, type) => ({
            padding: ".5rem 1.5rem",
            border: active && ".1px solid #000",
            border: (type === "outlined") && `1px solid ${theme.palette.primary}`
        }),


        pin: {
            position: "absolute",
            bottom: 0,
            right: -20
        },

        appBar: {
            width: `min(100vw, 600px)`,
            marginInline: "auto",
            boxShadow: `0px 1px 5px 0px ${theme.palette.primary.main} `,
            paddingBlock: "1rem",
            marginBottom: ".5rem"
        },

        myPaper: (test) => ({
            width: "min(95vw, 500px)",
            marginBlock: "1rem",
            marginInline: "auto",
            paddingBottom: "1.4rem",
            border: test ? `1px solid ${alpha(themeColor, 0.4)}` : "none"
        }),


        myCard: (test) => ({
            width: "95%",
            marginInline: "auto",
            paddingInline: "0.5rem",
            border: test ? `1px solid ${alpha(themeColor, 0.4)}` : "none"
        }),

        imgFilter: (test) => ({
            filter: test && " grayscale(100%)",

        }),

        textDisable: (test) => ({
            color: test && '#CCC'
        }),

        resultCard: {
            width: `min(90vw, 500px)`,
            border: `1px solid  ${alpha(themeColor, 0.2)}`,
            padding: ".7rem 0 .5rem .7rem",
            boxShadow: `5px 10px 20px 1px ${alpha(themeColor, 0.15)}`,
        }


    }
}

export const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
]

export default myStyles;