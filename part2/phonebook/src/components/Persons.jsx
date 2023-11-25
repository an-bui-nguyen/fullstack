import personService from "../services/persons";

const Persons = (props) => {
    const deletePerson = async (id) => {
        const person = props.persons.find((person) => person.id === id)
        if (confirm(`Delete ${person.name}?`)) {
            await personService.deletePerson(id);
            const newArray = props.persons.filter(function (person) {return person.id !== id});
            props.setPersons(newArray);
        }
    }

    const catchError = (personName) => {
        console.error();
        props.setNotification({type:"error", content: `Infomation of ${personName} has already been removed from server`});
        setTimeout(() => {
            props.setNotification(null);
            window.location.reload();
        }, 3000);
    }

    const createPerson = (data) => {
        return (
            <div key={data.id}>
                <p style={{display:"inline-block"}}>
                    {data.name} {data.number}
                </p>
                <button 
                    style={{display:"inline-block", marginLeft:"1.5rem"}} 
                    onClick={() => deletePerson(data.id).catch(() => catchError(data.name))}>
                    delete
                </button>
            </div>
        )
    }

    return (
        <div>
            {props.displayFilter ? props.filteredPersons.map(createPerson) : props.persons.map(createPerson)}
        </div>
    )
}

export default Persons;