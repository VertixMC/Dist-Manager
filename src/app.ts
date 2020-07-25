import { config } from 'dotenv';
import bootstrap from './ServerBootstrap';
import jenkins from 'jenkins';
import { bases } from './util/bases';
import DockerClient from './structure/docker/DockerClient';
import { WebhookClient } from 'discord.js';

config();

export const auth = process.env.AUTH_TOKEN || '';

export const jenkinsClient = jenkins(
    {
        baseUrl: `https://${process.env.JENKINS_USER || ''}:${process.env.JENKINS_PASSWORD || ''}@${bases.JENKINS_URL}`,
        promisify: true
    }
);

export const dockerClient = new DockerClient();

export const webhookClient = new WebhookClient(
    process.env.WEBHOOK_CHANNEL_ID || '',
    process.env.WEBHOOK_TOKEN || ''
);

(async() => {

    await bootstrap();

})();