const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const DBConnection = require('./config/connect')
const path = require("path");
const fs = require('fs')

const app = express()
dotenv.config()

//////connection of DB/////////
DBConnection()

const PORT = process.env.PORT 

//////middleware/////////
app.use(express.json())
app.use(cors())

const uploadsDir = path.join(__dirname, "uploads");

// Create uploads folder if it doesn’t exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

///ROUTES///
app.use('/api/admin', require('./routers/adminRoutes'))
app.use('/api/user', require('./routers/userRoutes'))

/// ✅ ROOT TEST ROUTE ///
app.get('/', (req, res) => {
  res.send('API is running...');
})

/// SERVER START ///
app.listen(PORT, () => console.log(`running on ${PORT}`))
