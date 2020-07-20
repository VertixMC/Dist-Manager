import { config } from 'dotenv';
import bootstrap from './ServerBootstrap';
import jenkins from 'jenkins';
import { bases } from './util/bases';
import { Docker } from 'docker-cli-js';

config();

export const jenkinsClient = jenkins(
    {
        baseUrl: `https://${process.env.JENKINS_USER}:${process.env.JENKINS_PASSWORD}@${bases.JENKINS_URL}`,
        promisify: true
    }
);

export const dockerClient = new Docker();

(async() => {

    await bootstrap();

})();