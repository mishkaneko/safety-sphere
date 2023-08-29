import { Injectable } from "@angular/core";
import { Controller, Get, injectNestClient } from 'nest-client';


@Injectable()
@Controller()
export class AppService {
    constructor() {
        injectNestClient(this)
    }

    @Get()
    getHello(): string {
        throw new Error("stub")
    }
}
