import IDockerContainer from "../../type/docker/IDockerContainer";
import DockerClient from "./DockerClient";
import RemoveContainerResponse from "../../type/docker/response/RemoveContainerResponse";

export default class DockerContainer {

    private dockerClient: DockerClient;
    containerData: IDockerContainer;

    constructor(dockerClient: DockerClient, containerData: IDockerContainer) {

        this.dockerClient = dockerClient;
        this.containerData = containerData;

    }

    async remove() {

        const commandRes: RemoveContainerResponse = await this.dockerClient.command(`rm ${this.containerData.names} -f`);

        commandRes.removed = commandRes.raw.replace('\n', '');

        return commandRes;

    }

}