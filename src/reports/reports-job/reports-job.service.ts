import { Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ReportsService } from '../reports/reports.service';

@Processor('reports')
export class ReportsJobService {
    constructor(private reportsService: ReportsService){}
    async produce(job: Job<{ reportId: number }>){
        await this.reportsService.produce(job.data.reportId);
        return{};
    }
}
