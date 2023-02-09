import axios from "axios";


//send request for sign in
export const sign_in = async (data) => {
    try {
        const response = await axios.post(
              '/identity/sign_in', {email:data[0],password:data[1]});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};