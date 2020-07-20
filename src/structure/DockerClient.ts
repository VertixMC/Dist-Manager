import { Docker, IOptions } from "docker-cli-js";
import ListContainersResponse from "../type/docker/response/ListContainersResponse";

export default class DockerClient extends Docker {

    constructor(options?: IOptions) {

        super(options);

    }

    async listContainers() : Promise<ListContainersResponse> {

        return await this.command('ps');

    }

}