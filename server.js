const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const signin = require('./controllers/handleSignIn')
const register = require('./controllers/handleRegister')
const profile = require('./controllers/handleProfile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
    host : 'postgresql-concave-38000',  //process.ENV.DATABASE_URL
    // ssl: true,
    user : '',
    password : '',
    database : 'smart-brain-db'
  });

const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => res.send('It is running!'))
app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))  
app.post('/register', (req,res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db)) 
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


