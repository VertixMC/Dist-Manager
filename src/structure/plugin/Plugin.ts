import Build from "../../type/jenkins/notification/Build";
import { createWriteStream, existsSync } from "fs";
import { join } from "path";
import { get } from "http";
import { webhookClient } from "../../app";
import { embeds } from "../../util/embeds";
import { mkdir, unlink } from "fs/promises";

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
                    await unlink(join(this.pluginDirectory, artifactName));
                } catch (e) {
                    webhookClient.send(embeds.deployFailure(e));
                }

            }

            // if the plugin directory doesn't exist, create it
            if (!this.pluginDirectoryExists()) {

                try {
                    await mkdir(this.pluginDirectory);
                } catch (e) {
                    webhookClient.send(embeds.deployFailure(e))
                }

            }

            this.downloadFile(buildArtifacts[artifact].archive, artifactName);

            webhookClient.send(embeds.deployComplete(build));

        }

    }

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