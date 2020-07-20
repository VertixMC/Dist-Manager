export default interface DockerContainer {

    containerId: string;
    image: string;
    command: string;
    created: string;
    status: string;
    ports: string;
    names: string;

}