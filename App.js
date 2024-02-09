const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');

// Create an Express application
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lab4_users_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Users API
app.post('/users', async (req, res) => {
  if (Array.isArray(req.body)) {
    try {
      const users = req.body.map(user => {
        const { name, username, email, address, phone, website } = user;
        const city = address?.city;
        const zipcode = address?.zipcode;
        return { name, username, email, city, zipcode, phone, website };
      });

      const insertedUsers = await User.insertMany(users);
      res.status(201).json(insertedUsers);
      insertedUsers.forEach(user => {
        console.log(user.username + " has been added to the database");
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    const { name, username, email, address, phone, website } = req.body;
    const city = address?.city;
    const zipcode = address?.zipcode;
    const newUser = new User({ name, username, email, city, zipcode, phone, website });

    newUser.save()
      .then(user => {
        res.status(201).json(user);
        console.log(user.username + " has been added to the database");
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  }
});  

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});