import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;


//send request for access to the server 
export const view_all = async (type) => {
    try {
        let req_url="";
        if(type === "user")
        {
            req_url = "/user/active"
        }
        else if(type === "admin")
        {
            req_url = "/admin/active"
        }
        const response = await axios.get(
            baseUrl + req_url, { headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send request for access to the server 
export const delete_user = async (type,id) => {
    try {
        let req_url="";
        if(type === "user")
        {
            req_url = "/user/delete"
        }
        else if(type === "admin")
        {
            req_url = "/admin/delete"
        }
        const response = await axios.patch(
            baseUrl + req_url,{id:id}, { headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

//send update lead request
export const update_lead_req = async (lead,id) => {
    try {
        const response = await axios.patch(
            baseUrl + "/user/lead",{lead:lead,id:id}, { headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};