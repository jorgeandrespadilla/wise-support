import app from "@/config/server";
import { PORT } from '@/constants/settings';

app.get('/', (_req, res) => {
  res.send('Server is running!')
})

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
})