import axios from "axios";


//send request for generate mail
export const send_mail = async (recipient,sender,subject,body,date) => {

    // console.log(date)
    try {
        const response = await axios.post(
              '/mail/batch/schedule', {
                recipients:recipient,
                sender:sender,
                subject:subject,
                body: body,
                date_time:date+"+05:30",
                initiator:"admin"
            });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};