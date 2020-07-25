import { MessageEmbed } from "discord.js"
import Build from "../type/jenkins/notification/Build"
import { readableArtifacts } from "./functions"

export const embeds = {
    deployComplete: (build: Build) => {
        const embed = new MessageEmbed()
            .setTitle(`Successfully deployed artifacts`)
            .setDescription(`${readableArtifacts(build).map((a) => `- ${a}`)}`)
            .setColor('GREEN');
        return embed;
    }
}