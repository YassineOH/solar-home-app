import axios from 'axios';

export const getSolarPower = async (mode, lat, lng, peakpower) => {
    const suburl = `https://re.jrc.ec.europa.eu/api/${mode}?loss=10&outputformat=json&lon=${lng}&lat=${lat}&peakpower=${peakpower}&angle=${lat} `

    try {
        const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(suburl)}`);

        return response
    } catch (error) {
        console.log(error);
    }
};
