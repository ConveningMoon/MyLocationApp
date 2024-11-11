const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  console.log('Received location data:', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Test server listening on port 3000');
});
