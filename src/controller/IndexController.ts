import { Controller, Get } from "@tsed/common";

@Controller('/')
export class IndexController {

    @Get()
    async res() {

        return 'dist is online'

    }

}