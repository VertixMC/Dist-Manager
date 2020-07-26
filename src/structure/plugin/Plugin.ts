import Build from "../../type/jenkins/notification/Build";
import { createWriteStream, existsSync } from "fs";
import { join } from "path";
import { webhookClient, jenkinsAuth } from "../../app";
import { embeds } from "../../util/embeds";
import { promises as fsPromises } from "fs";
import fetch from "node-fetch";

export default class Plugin {

    name: string;
    jenkinsJob: string;
    pluginDirectory: string;

    constructor(name: string, jenkinsJob: string, pluginDirectory: string) {

        this.name = name;
        this.jenkinsJob = jenkinsJob;
        this.pluginDirectory = pluginDirectory;

    }

    async update(build: Build) {

        const buildArtifacts = build.artifacts;
         
        for (const artifact in buildArtifacts) {

            const artifactName = artifact.replace('target/', '');

            // if artifact exists in output directory, delete it
            if (this.fileExistsInDirectory(artifactName)) {

                try {
                    await fsPromises.unlink(join(this.pluginDirectory, artifactName));
                } catch (e) {
                    await webhookClient.send(embeds.deployFailure(e));
                }

            }

            // if the plugin directory doesn't exist, create it
            if (!this.pluginDirectoryExists()) {

                try {
                    await fsPromises.mkdir(this.pluginDirectory);
                } catch (e) {
                    await webhookClient.send(embeds.deployFailure(e))
                }

            }

            await this.downloadFile(buildArtifacts[artifact].archive, `${jenkinsAuth.user}:${jenkinsAuth.password}`, artifactName);

        }

        await webhookClient.send(embeds.deployComplete(build));

    }

    async downloadFile(url: string, credentials: string, name: string) {

        const file = createWriteStream(join(this.pluginDirectory, name));
        
        const res = await fetch(url, {
            headers: {
                'Authorization': `Basic ${Buffer.from(credentials).toString('base64')}`
            }
        });

        if (res.ok) {

            if (res.headers.get('content-type') != 'application/java-archive') {
                return await webhookClient.send(embeds.deployFailure('File is not a jar file'));
            }

            res.body.pipe(file);

            file.on('finish', () => {
                file.close();
            });

        }

    }

    pluginDirectoryExists() {

        return existsSync(this.pluginDirectory);

    }

    fileExistsInDirectory(fileName: string) {

        return existsSync(join(this.pluginDirectory, fileName));

    }

}