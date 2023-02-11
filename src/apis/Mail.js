import axios from "axios";


//send request for sign in
export const send_mail = async (email,password) => {
    try {
        const response = await axios.post(
              '/mail/schedule', {email:email,password:password});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};