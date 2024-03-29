import { useState, useEffect } from 'react';
import personService from "./services/persons";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allPersons = await personService.getAll();
      setPersons(allPersons);
    }

    fetchData().catch(console.error())

  }, [])

  const [displayFilter, setDisplayFilter] = useState(false);

  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);


  const addPerson = async (event) => {
    event.preventDefault();
    setFilteredPersons(persons);
    
    let names = persons.map(a => a.name);

    /**
     * An async function to post new phone number entry to json-server if not duplicated entry.
     */
    async function postData() {
      const newObject = {
        name: newName,
        number: newNumber
      }
      personService.addPerson(newObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNotification({type: "success", content: `Added ${newName}`})
        setNewName("");
        setNewNumber("");
        setDisplayFilter(false)
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      })
      .catch(error => {
        setNotification({type: "error", content: `${error.response.data.error}`});
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      });
    }

    /**
     * Async function to make an axios request to server to update phone number if name existed in database.
     * @param {*} newName Name of the entry to be updated with new phone number
     * @param {*} newNumber New phone number
     */
    async function putData(newName, newNumber, id) {
      const responseData = await personService.putPerson({name: newName, number: newNumber}, id);
      setPersons(persons.map(p => p.name !== newName ? p : responseData.data));
    }

    if (names.includes(newName)) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const foundPerson = persons.find((person) => {return person.name == newName})
        putData(newName, newNumber, foundPerson.id)
        .then(() => {
          setNewName("");
          setNewNumber("");
          setNotification({type: "success", content: `Changed ${newName}'s number.`})
          setTimeout(() => {
            setNotification(null);
          }, 3000)
        })
        .catch(error => {
          setNotification({type: "error", content: `${error.response.data.error}`});
          setTimeout(() => {
            setNotification(null);
          }, 3000)
        });
      }
      
    } else {
      await postData()
      .catch(error => {
        console.log(error.response.data.error); 
        setNotification({type: "error", content: `${error.response.data.error}`});
        setTimeout(() => {
          setNotification(null);
        }, 3000)
    });
    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setDisplayFilter(true);
    const filterValue = event.target.value.toLowerCase();
    setNewFilter(event.target.value);
    const filteredArray = persons.filter((person) => {return person.name.toLowerCase().includes(filterValue)});
    setFilteredPersons(filteredArray);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter}/>
      <h2>Add a new entry</h2>
      <PersonForm 
        handleSubmit={addPerson} 
        handleInputChange={handleInputChange} 
        newName={newName} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons 
        displayFilter={displayFilter} 
        persons={persons} 
        filteredPersons={filteredPersons} 
        setPersons={setPersons} 
        setNotification={setNotification}/>
    </div>
  )
}

export default App