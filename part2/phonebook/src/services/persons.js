import axios from "axios";

const baseURL = "http://localhost:3000/api/persons/";

const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const addPerson = async (newPerson) => {
    const response = axios.post(baseURL, newPerson);
    return response;
}

const putPerson = (newPerson, id) => {
    const response = axios.put(`${baseURL}${id}`, newPerson);
    return response;
}

const deletePerson = async (id) => {
    const response = await axios.delete(`${baseURL}${id}`);
    return response.data;
}

export default { getAll, addPerson, deletePerson, putPerson }