import { Controller, Post, BodyParams, UseBefore } from "@tsed/common";
import BuildNotification from "../type/jenkins/notification/BuildNotification";
import { IsAuthenticated } from "../middleware/IsAuthenticated";
import { pluginManager } from "../structure/plugin/manager/PluginManager";

@Controller('/jenkins')
export class JenkinsController {

    // TODO: Authenticate using a username/password basis in the future. (This would be implemented when the admin panel is written)
    
    @UseBefore(IsAuthenticated)
    @Post('/webhook/:auth')
    async notify(@BodyParams() body: BuildNotification) {

        const plugin = pluginManager.get(body.name);
        
        if (plugin) {
            await plugin.update(body.build);
        }

        return;

    }

}