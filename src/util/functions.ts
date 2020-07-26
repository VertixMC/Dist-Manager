import Build from "../type/jenkins/notification/Build";

export const readableArtifacts = (build: Build) => {

    const artifacts: string[] = [];

    for (const artifact in build.artifacts) {
        artifacts.push(artifact.replace('/target', ''));
    }

    return artifacts;

}