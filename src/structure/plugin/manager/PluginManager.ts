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