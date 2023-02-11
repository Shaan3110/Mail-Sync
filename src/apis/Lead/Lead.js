import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;


//send request for all the projects data
export const get_all_projects = async (type) => {
    try {
        const response = await axios.get(
            baseUrl + `/user/show/projects?type=${type}`, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send request for delete a project
export const delete_project = async (code) => {
    try {
        const response = await axios.patch(
            baseUrl + '/user/delete/project', {code:code}, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


//send request to add a project
export const add_new_project = async (new_name,new_code) => {
    try {
        new_name=new_name.toLowerCase();
        new_code=new_code.toLowerCase();
        const response = await axios.post(
            baseUrl + '/user/add/project', {name:new_name,code:new_code}, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


