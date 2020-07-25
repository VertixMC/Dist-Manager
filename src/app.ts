import { config } from 'dotenv';
import bootstrap from './ServerBootstrap';
import jenkins from 'jenkins';
import { bases } from './util/bases';
import DockerClient from './structure/docker/DockerClient';

config();

export const auth = process.env.AUTH_TOKEN || '';

export const jenkinsClient = jenkins(
    {
        baseUrl: `https://${process.env.JENKINS_USER || ''}:${process.env.JENKINS_PASSWORD || ''}@${bases.JENKINS_URL}`,
        promisify: true
    }
);

export const dockerClient = new DockerClient();

(async() => {

    await bootstrap();

})();