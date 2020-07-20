import Response from "./Response";
import IDockerContainer from "../IDockerContainer";

export default interface ListContainersResponse extends Response {

    containerList: IDockerContainer[];

}