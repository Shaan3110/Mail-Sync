import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL


//send request for access to the server 
export const send_req = async (data) => {
    try {
        const response = await axios.post(
            baseUrl + '/user/request/access', data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const get_dropdown = async() => {
    try {
        const response = await axios.get(
            baseUrl + '/config/department');
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}


//send request for access to the server 
export const send_admin_req = async (data) => {
    try {
        const response = await axios.post(
            baseUrl + '/admin/request/access', data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

//send request for access to the server 
export const get_admin_reqs = async () => {
    try {
        const response = await axios.get(
            baseUrl + '/admin/request/access',{ headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send request for access to the server 
export const get_user_reqs = async () => {
    try {
        const response = await axios.get(
            baseUrl + '/user/request/access',{ headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send approval request for admin and user
export const approve_req = async (id,type) => {
    try {
        let req_url="";
        if(type === "user")
        {
            req_url = "/user/approve"
        }
        else if(type === "admin")
        {
            req_url = "/admin/approve"
        }
        const response = await axios.patch(
            baseUrl + req_url,{id:id}, { headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send approval request for admin
export const reject_req = async (id,type) => {
    try {
        let req_url="";
        if(type === "user")
        {
            req_url = "/user/reject"
        }
        else if(type === "admin")
        {
            req_url = "/admin/reject"
        }
        const response = await axios.patch(
            baseUrl + req_url,{id:id}, { headers: { 'token': `${localStorage.getItem('token')}` }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};