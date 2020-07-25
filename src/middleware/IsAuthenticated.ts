import { Middleware, IMiddleware, PathParams } from "@tsed/common";
import { auth } from "../app";
import { Unauthorized } from "@tsed/exceptions";

@Middleware()
export class IsAuthenticated implements IMiddleware {

    async use(@PathParams('auth') authToken: string) {

        if (!authToken || authToken != auth) {

            throw new Unauthorized('INVALID_AUTH');

        }

    }

}