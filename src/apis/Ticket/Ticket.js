import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL


//beta passcode verification
export const ticket_data = async (project,assignee,reporter,status) => {
    let parameters = {};
    if(project.length >= 1)
    {
        parameters.project_name=project
    }
    if(status.length >= 1)
    {
        parameters.status=status
    }
    if(assignee.length >= 1)
    {
        parameters.assignee_name=assignee
    }
    if(reporter.length >= 1)
    {
        parameters.reporter_name=reporter
    }
    try {
        const response = await axios.get(
            baseUrl + '/ticket/details', { headers: { 'token': `${localStorage.getItem('token')}`, }, params:parameters });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const add_ticket = async (summary,description,project_type,project_name,assignee_name,status) => {
    try {
        summary=summary.toLowerCase();
        project_name=project_name.toLowerCase();
        status = status.toLowerCase();
        project_type = project_type.toLowerCase();
        const response = await axios.post(
            baseUrl + '/ticket/add/new',{
                summary:summary,
                description:description,
                type: project_type,
                project_name:project_name,
                assignee_name: assignee_name,
                status: status
            }, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const delete_ticket = async (code) => {
    try {
        code=code.toLowerCase();
        const response = await axios.delete(
            baseUrl + `/ticket/delete?code=${code}`, { headers: { 'token': `${localStorage.getItem('token')}`, }});
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};