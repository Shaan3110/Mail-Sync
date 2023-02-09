import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;


//send request for sign in
export const sign_in = async (data) => {
    try {
        const response = await axios.post(
            baseUrl + 'identity/sign_in', {email:data[0],password:data[1]});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};