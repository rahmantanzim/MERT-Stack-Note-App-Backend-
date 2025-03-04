require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const notesRoutes = require('./routes/notesRoutes');

const app = express();

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Enable JSON body parsing

//connect to mondoDB:
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Connected'))
.catch(err=> console.log('Connection error:', err))
// Use notesRoutes for handling "/api/notes" routes
app.use('/api', notesRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Express! Notes API is running.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
