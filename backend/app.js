const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes'); // ✅ make sure path is correct

const app = express();

app.use(cors());                      // ✅ enable CORS for frontend
app.use(express.json());             // ✅ parse incoming JSON

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// ✅ Mount your routes
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});