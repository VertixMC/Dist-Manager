import { config } from 'dotenv';
import bootstrap from './ServerBootstrap';

config();

(async() => {

    await bootstrap();

})();