import Response from "./Response";
import DockerContainer from "../DockerContainer";

export default interface ListContainersResponse extends Response {

    containerList: DockerContainer[];

}