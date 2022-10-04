import app from "@/config/server";
import { PORT } from '@/constants/settings';

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
})