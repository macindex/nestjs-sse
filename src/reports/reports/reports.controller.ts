import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){

    }
    @Get()
    all(){
        return this.reportsService.all();
    }
    @Post(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number){
        return this.reportsService.findOne(id);
    }
    request(){
        return this.reportsService.request();
    }
}
