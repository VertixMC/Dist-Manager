import Build from "../../type/jenkins/notification/Build";
import { unlink, createWriteStream, existsSync } from "fs";
import { join } from "path";
import { get } from "http";

export default class Plugin {

    name: string;
    jenkinsJob: string;
    pluginDirectory: string;

    constructor(name: string, jenkinsJob: string, pluginDirectory: string) {

        this.name = name;
        this.jenkinsJob = jenkinsJob;
        this.pluginDirectory = pluginDirectory;

    }

    update(build: Build) {

        const buildArtifacts = build.artifacts;
        
        for (const artifact in buildArtifacts) {

            const artifactName = artifact.replace('target/', '');

            // if artifact exists in output directory, delete it
            if (this.fileExistsInDirectory(artifactName)) {

                unlink(join(this.pluginDirectory, artifactName), (err) => {
                    
                    if (err) {
                        throw new Error(`There was an error while unlinking file ${artifactName} in ${this.pluginDirectory} -- ${err}`);
                    }

                });

            }

            this.downloadFile(buildArtifacts[artifact].archive, artifactName);

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

    fileExistsInDirectory(fileName: string) {

        return existsSync(join(this.pluginDirectory, fileName));

    }

}