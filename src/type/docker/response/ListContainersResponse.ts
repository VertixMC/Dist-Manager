import Response from "./Response";
import DockerContainer from "../IDockerContainer";

export default interface ListContainersResponse extends Response {

    containerList: DockerContainer[];

}