import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;


//send request for all the departments data
export const get_all_departments = async () => {
    try {
        const response = await axios.get(
            baseUrl + '/config/department', { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const delete_department = async (department_name) => {
    try {
        const response = await axios.delete(
            baseUrl + `/admin/department/delete?name=${department_name}`, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const add_department = async (department_name) => {
    try {
        department_name=department_name.toLowerCase();
        const response = await axios.post(
            baseUrl + '/admin/department/add',{name:department_name}, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send request to add a stage
export const add_new_stage = async (new_name,color_code) => {
    try {
        new_name=new_name.toLowerCase();
        const response = await axios.post(
            baseUrl + '/config/add/status', {name:new_name,color:color_code}, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};



//send request for all the projects data
export const get_all_stages = async () => {
    try {
        const response = await axios.get(
            baseUrl + `/config/status`, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};



//send request to delete a status
export const delete_stage = async (name) => {
    try {
        const response = await axios.post(
            baseUrl + `/config/delete/status`,{name:name.toLowerCase()}, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};