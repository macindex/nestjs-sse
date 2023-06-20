import { Processor } from '@nestjs/bull';
import { ReportsService } from '../reports/reports.service';

@Processor('reports')
export class ReportsJobService {
    constructor(private reportsService: ReportsService){}
    produce(job: Job<{ reportId: number }>){
        this.reportsService.produce(job.data.reportId);
        return{};
    }
}
