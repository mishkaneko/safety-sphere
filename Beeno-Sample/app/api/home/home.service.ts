import { Injectable } from "@angular/core";
import { Controller, Get, injectNestClient } from 'nest-client';
import { IncidentListItem } from '../incident-list-item/incident-list-item.interface';


@Injectable()
@Controller('home')
export class HomeService {
    constructor() {
        injectNestClient(this)
    }

    @Get('/user-reports')
    getUserReports(): Promise<IncidentListItem[]> {
        throw new Error("stub")
    }
}
