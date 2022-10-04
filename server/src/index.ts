import express from 'express';
import { PORT } from '@/constants/settings';

const app = express()

app.get('/', (_req, res) => {
  res.send('Server is running!')
})

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
})