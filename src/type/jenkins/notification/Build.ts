import BuildArtifact from "./BuildArtifact";

export default interface Build {
    
    full_url: string;
    number: number;
    phase: string;
    status: string;
    url: string;
    scm: {
        url: string;
        branch: string;
        commit: string;
    };
    artifacts: BuildArtifact;

}