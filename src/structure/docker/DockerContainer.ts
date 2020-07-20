import IDockerContainer from "../../type/docker/IDockerContainer";

export default class DockerContainer {

    containerData: IDockerContainer;

    constructor(containerData: IDockerContainer) {

        this.containerData = containerData;

    }

}