import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL


//beta passcode verification
export const beta_passcode_verification = async (code) => {
    try {
        const response = await axios.get(
            baseUrl + '/beta/check', { params: { 'passcode': `${code}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};