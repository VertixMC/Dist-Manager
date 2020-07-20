import { config } from 'dotenv';
import bootstrap from './ServerBootstrap';
import jenkins from 'jenkins';
import { bases } from './util/bases';

config();

export const jenkinsClient = jenkins(
    {
        baseUrl: `https://${process.env.JENKINS_USER}:${process.env.JENKINS_PASSWORD}@${bases.JENKINS_URL}`,
        promisify: true
    }
);

(async() => {

    await bootstrap();

})();