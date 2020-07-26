import Build from "../../type/jenkins/notification/Build";
import { createWriteStream, existsSync } from "fs";
import { join } from "path";
import { get } from "https";
import { webhookClient } from "../../app";
import { embeds } from "../../util/embeds";
import { promises as fsPromises } from 'fs';

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

            this.downloadFile(buildArtifacts[artifact].archive, artifactName);

        }

        await webhookClient.send(embeds.deployComplete(build));

    }

    // TODO: support HTTP protocol
    downloadFile(url: string, name: string) {

        const file = createWriteStream(join(this.pluginDirectory, name));
        
        get(url, res => {
            
            res.pipe(file);
            
            file.on('finish', () => {
                file.close();
            });

        });

    }

    pluginDirectoryExists() {

        return existsSync(this.pluginDirectory);

    }

    fileExistsInDirectory(fileName: string) {

        return existsSync(join(this.pluginDirectory, fileName));

    }

}