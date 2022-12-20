import app from '@/config/server';
import { PORT } from '@/constants/settings';
import logger from '@/utils/logger';
import '@/common/extensions'; // Load extension methods

app.listen(PORT, () => {
    logger.info(`Server is listening at port ${PORT}`);
});
