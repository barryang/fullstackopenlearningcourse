const bcrypt = require('bcrypt')

const initialUsers = [
    {
        username: "jakeoff",
        name: "maomao",
        passwordHash: async () => {return await bcrypt.hash("1234", 10)}
    },
    {
        username: "thatonecat",
        name: "Barry",
        passwordHash: async () => {return await bcrypt.hash("12345", 10)}
    }
]

module.exports = {
    initialUsers,
}