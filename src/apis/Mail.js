import axios from "axios";


//send request for generate mail
export const send_mail = async (recipient,sender,subject,group,body,date) => {

    // console.log(date)
    try {
        const response = await axios.post(
              '/mail/schedule', {
                recipient:recipient,
                sender:sender,
                subject:subject,
                body: body,
                date_time:date+"+05:30"
            });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};