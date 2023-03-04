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

export const add_group = async (name,description,emails) => {

    try {
        const response = await axios.post(
              '/groups/group/add', {
                domain:"community",
                name:name,
                meta: {
                    "description":description,
                    "users":emails
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