const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')

// Load environment variables
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())

// CORS
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/v1/stores', require('./routes/stores'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))