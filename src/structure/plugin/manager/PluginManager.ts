import Plugin from "../Plugin";
import { resolve } from "path";

export const pluginManager: Map<string, Plugin> = new Map();

pluginManager.set(
    'Bungeecore',
    new Plugin(
        'Bungeecore',
        'Bungeecore',
        resolve(process.cwd(), 'plugins', 'Bungeecore')
    ) 
)

pluginManager.set(
    'Chat-Handler',
    new Plugin(
        'Chat-Handler',
        'Chat-Handler',
        resolve(process.cwd(), 'plugins', 'ChatHandler')
    )
)