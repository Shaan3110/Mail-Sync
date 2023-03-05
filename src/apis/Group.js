import axios from "axios";

//get all groups
export const get_all_groups = async () => {

    try {
        const response = await axios.post(
              '/groups/group/list', {
                domain:"community",
                meta:true
              });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const add_group = async (name,description) => {

    try {
        const response = await axios.post(
              '/groups/group/add', {
                domain:"community",
                name:name,
                meta: {
                    "description":description,
                }
            });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const delete_group = async (name) => {

    console.log(name);
    try {
        const response = await axios.post(
              '/groups/entity/remove', {
                domain:"community",
                entity:name
            });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const update_group = async (oldname,name,description) => {

    console.log(name);
    try {
        const response = await axios.post(
              '/groups/entity/update', {
                domain:"community",
                identifier:oldname,
                update:{
                    identifier:name,
                    meta: {
                        "description":description,
                    }
                }
            });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const add_user = async (email) => {

    try {
        const response = await axios.post(
              '/groups/user/add', {
                domain: "community",
                name:email
                });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const get_group_users = async (name) => {

    try {
        const response = await axios.post(
              '/groups/nested/get', {
                domain: "community",
                group:name,
                meta:true
                });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};



export const add_group_child = async (name,description,email) => {

    try {
        const response = await axios.post(
              '/groups/nest', {
                domain: "community",
                parent: name,
                child: email,
                });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};