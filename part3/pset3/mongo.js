const mongoose = require('mongoose')

console.log(process.argv.length)
if (!(process.argv.length !== 3 || process.argv.length !== 5)) {
    console.log('Please provide the password as an argument: node mongo.js <password> or node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.lcffk.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
    Phonebook.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
}

if (process.argv.length === 5) {
    const number = new Phonebook ({
        name: process.argv[3],
        number: process.argv[4].toString()
    })
    number.save().then(result => {
        console.log(`added ${number.name} number ${number.number} to phonebook`)
        mongoose.connection.close()
    })
}