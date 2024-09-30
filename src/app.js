import express from "express"

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = [
    {id: 1, firstName: "Juan"},
    {id: 2, firstName: "Pedro"}

]

app.get('/api/users', (req, res)=> {
    res.status(200).send({error: null, data: 'Hola, todo GET'})
})

app.post('/api/users', (req, res)=> {
        if (req.body.hasOwnProperty('firstName')) {
            const newUser = {id: users.length + 1, firsName: req.body.firstName}
            users.push(newUser)
            res.status(200).send({error: null, data: `${req.body.firstName}`});

        } else {res.status(400).send({error: 'Faltan campos', data: []})}


    })


app.listen(PORT, ()=> {
    console.log(`Server activo en puerto ${PORT}`)
})