import { Docker, IOptions } from "docker-cli-js";
import ListContainersResponse from "../../type/docker/response/ListContainersResponse";
import DockerContainer from "./DockerContainer";

export default class DockerClient extends Docker {

    constructor(options?: IOptions) {

        super(options);

    }

    async listContainers() {

        const listContainersResponse: ListContainersResponse = await this.command('ps');

        return listContainersResponse.containerList.map(c => new DockerContainer(c));

    }

    async getContainer(name: string) {

        const containers = await this.listContainers();
        
        const container = containers.find(c => c.containerData.names === name);

        return container;

    }

}