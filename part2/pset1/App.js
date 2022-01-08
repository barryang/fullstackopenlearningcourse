import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newgroup , setNewGroup] = useState('')
  const [newdisplay, setNewDisplay] = useState(persons)

  const add = (event) => {
    event.preventDefault()
    for (const i of persons) {
      if (newName === i.name) {
        setNewName('')
        return alert(`${newName} is already added to phonebook`)
      }
      if (newNumber === i.number) {
        setNewNumber('')
        return alert(`${newNumber} is already added to phonebook`)
      }
    }
    const person = { id: persons.length + 1, name: newName, }
    setPersons(persons.concat(person))
    setNewName('')
  }

  const changename = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const changenumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const changegroup = (event) => {
    setNewGroup(event.target.value)
    let check = event.target.value
    if (check === '') {
      setNewDisplay(persons)
    } else {
      let group = []
      for (let people of persons) {
        if (people.name.includes(check)){
          group.push(people)
        }
      }
      setNewDisplay(group)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input onChange={changegroup} value={newgroup}/></div>
      <h2>PhoneBook</h2>
      <form onSubmit={add}>
        <div>name: <input onChange={changename} value={newName}/></div>
        <div>number: <input onChange={changenumber} value={newNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {
      newdisplay.map(i => <div key={i.id}><b>name:</b>{i.name} <b>number:</b>{i.number}</div>)
      }
    </div>
  )
}

export default App;
