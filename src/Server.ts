import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common';
import * as bodyParser from 'body-parser';

const rootDir = __dirname;

@ServerSettings({ 
    rootDir,
    httpPort: 3000,
    acceptMimes: ['application/json'],
    mount: {
        '/': `${rootDir}/controller/**/*.ts`,
    },
    componentsScan: [
        `${rootDir}/middleware/**/*.ts`,
        `${rootDir}/service/**/*.ts`
    ]
 })
 export class Server extends ServerLoader {
     public $beforeRoutesInit(): void | Promise<any> {
         this
            .use(GlobalAcceptMimesMiddleware)
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
     }
 }