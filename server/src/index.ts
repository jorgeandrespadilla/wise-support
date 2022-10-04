import express from 'express';

const app = express()
const port = 4000;

app.get('/', (_req, res) => {
  res.send('Server is running!')
})

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
})