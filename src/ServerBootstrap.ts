import { $log, ServerLoader } from '@tsed/common';
import { Server } from './Server';

export default async function bootstrap() {
    try {
        $log.debug('Starting server...');
        const server = await ServerLoader.bootstrap(Server);
        
        await server.listen();
        $log.debug('Server initialized')
    } catch (e) {
        $log.error(e);
    }
}