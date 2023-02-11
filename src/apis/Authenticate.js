import axios from "axios";


//send request for sign in
export const sign_in = async (email,password) => {
    try {
        const response = await axios.post(
              '/identity/sign_in', {email:email,password:password});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

//send request for sign in
export const verify_token = async () => {
    try {
        const response = await axios.post(
              '/identity/verify_jwt', {token:localStorage.getItem("token")});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};