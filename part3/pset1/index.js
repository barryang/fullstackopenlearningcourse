const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('json', function (req, res) {return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan('tiny'))

let phonebook =[
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${phonebook.length} people</div>
    <div>${new Date()}<div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(e => e.id === id)

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(e => e.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    return maxId + 1
}



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.number || !body.name) {
        return res.status(400).json({
            error: `Missing either number or name`
        })
    } else if (phonebook.find(e => e.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const  person = {
        id : generateId(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(person)

    res.json(phonebook)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
