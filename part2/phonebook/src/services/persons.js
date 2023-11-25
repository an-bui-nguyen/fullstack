import axios from "axios";

const baseURL = "http://localhost:3001/persons/";

const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const addPerson = async (newPerson) => {
    const response = await axios.post(baseURL, newPerson);
    console.log(response.data);
    return response.data;
}

const putPerson = async (newPerson, id) => {
    const response = await axios.put(`${baseURL}${id}`, newPerson);
    return response.data;
}

const deletePerson = async (id) => {
    await axios.delete(`${baseURL}${id}`);
}

export default { getAll, addPerson, deletePerson, putPerson }