import React, { useEffect, useState } from 'react'
import noteService from './services/notes'
import './App.css'
import Notify from './components/notifications'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newgroup , setNewGroup] = useState('')
  const [newdisplay, setNewDisplay] = useState([])
  const [notification, setNewNot] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setNewDisplay(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])



  const add = (event) => {
    event.preventDefault()
    let x = 0;
    for (const i of persons) {
      if (newName === i.name) {
        if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
          setNewName('')
          return
        } else if (newNumber !== i.number) {
          const person = { ...i, number: newNumber }
          console.log(person)
          noteService
          .update(i.id, person)
          .then(r => {
            console.log('Success!')
            let newpersons = [...persons]
            newpersons[x] = person
            setPersons(newpersons)
            setNewDisplay(newpersons)
            setNewNot({message:`Changed number for ${person.name}`, positive:true})
            setTimeout(() => {
              setNewNot(null)
            }, 5000)
          })
          .catch(error => {
            setNewNot({message:`Information of ${person.name} has been removed from the server`, positive:false})
            setTimeout(() => {
              setNewNot(null)
            }, 5000)
          })
          return
        } else {
          return
        }
      }
      if (newNumber === i.number) {
        setNewNumber('')
        setNewNot({message:`Number already exist in phonebook`, positive:false})
            setTimeout(() => {
              setNewNot(null)
            }, 5000)
        return
      }
      x += 1
    }
    const person = { id: persons.length + 1, name: newName, number: newNumber}

    noteService
    .create(person)
    .then(response => {
      console.log('success!')
      setPersons(persons.concat(response.data))
      setNewDisplay(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setNewNot({message: `Added ${person.name}`, positive: true})
            setTimeout(() => {
              setNewNot(null)
            }, 5000)
    })
    .catch(error => {
      console.log(error)
    })
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

  const remove = (event) => {
    console.log(event.target.value)
    const del = persons.find(element => element.id == event.target.value)
    console.log(del)
    if (window.confirm(`Delete ${del.name}?`)) {
      noteService
      .remove(event.target.value)
      .then(response => {
        console.log('success')
        let newpersons = persons.filter(e => e.id != event.target.value)
        console.log(newpersons)
        setPersons(newpersons)
        setNewDisplay(newpersons)
      })
      .catch((error) => {
        console.log(error)
        setNewNot({message: `Information of ${del.name} has already been removed from the server`, positive: false})
            setTimeout(() => {
              setNewNot(null)
            }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notify message={notification} />
      <div>filter shown with<input onChange={changegroup} value={newgroup}/></div>
      <h2>PhoneBook</h2>
      <form onSubmit={add}>
        <div>name: <input onChange={changename} value={newName}/></div>
        <div>number: <input onChange={changenumber} value={newNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {
      newdisplay.map(i => <div key={i.id}><b>name:</b>{i.name} <b>number:</b>{i.number} <button onClick={remove} value={i.id}>delete</button></div>)
      }
    </div>
  )
}

export default App;