import { Controller, Get, MessageEvent, Param, ParseIntPipe, Post, Sse } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { defer, map, Observable, repeat } from 'rxjs'

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){

    }
    @Get()
    all(){
        return this.reportsService.all();
    }
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number){
        return this.reportsService.findOne(id);
    }
    @Post()
    request(){
        return this.reportsService.request();
    }
    @Sse(':id/events')
    events(@Param('id', new ParseIntPipe()) id: number, ): Observable<MessageEvent>{
        return defer(() => this.reportsService.findOne(id)).pipe(repeat({
            delay: 1000,
        }),
        map((report) => ({
            type: 'message',
            data: report,
        })),
        );
    }
}
