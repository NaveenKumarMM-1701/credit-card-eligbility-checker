const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/loginform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const UserSchema = new mongoose.Schema({
  userId: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/redirection_handling_credit1.html'));
});

app.post('/login', async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  try {
    console.log(`Searching for user with userId: ${userId} and password: ${password}`);
    const user = await User.findOne({ userId, password });
    console.log(`Found user:`, user);
    if (user) {
      res.redirect('https://www.google.com');
    } else {
      res.status(401).json({error: 'Invalid credentials'});
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
