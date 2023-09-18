import { CreateIncidentReportDto } from 'src/report-incident/report-incident.dto';
import { ReportIncidentHistoryService } from './report-incident-history.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { randomUUID } from 'crypto';

@Controller('report-incident-history')
export class ReportIncidentHistoryController {
  constructor(
    private reportIncidentHistoryService: ReportIncidentHistoryService,
  ) {}
  @Get('report-record')
  getReportRecord() {
    return this.reportIncidentHistoryService.getReportRecord();
  }
  @Get('edit-incident/:id')
  async getSpecificReportRecord(@Param('id') id: number) {
    const reportRecord =
      await this.reportIncidentHistoryService.getSpecificReportRecord(id);
    console.log('reportRecord: ', reportRecord);
    const convertedReportRecord = [
      { name: 'reportId', key: 'id', value: reportRecord.id },
      { name: 'incident', key: 'incidentType', value: reportRecord.incident },
      { name: 'date', key: 'datePicker', value: reportRecord.date },
      { name: 'time', key: 'timePicker', value: reportRecord.time },
      { name: 'location', key: 'location', value: reportRecord.location },
      {
        name: 'description',
        key: 'description',
        value: reportRecord.description,
      },
      { name: 'imageArr', key: 'image', value: reportRecord.image_array },
    ];
    console.log('typeof date: ', typeof reportRecord.date);

    return convertedReportRecord;
  }
  @Put('edit-incident/:id')
  updateSpecificReportRecord(
    @Body() createIncidentReportDto: CreateIncidentReportDto,
    @Param('id') id: number,
  ) {
    return this.reportIncidentHistoryService.updateSpecificReportRecord(
      createIncidentReportDto,
      id,
    );
  }

  // @Put('edit-incident/:id')
  // @UseInterceptors(
  //   FilesInterceptor('images', 20, {
  //     storage: multer.diskStorage({
  //       destination: 'uploads/user-report-image',
  //       filename(req, file, callback) {
  //         // file.originalname.split('.').pop()
  //         let extname = file.mimetype.split('/').pop().split('.').pop();
  //         let filename = randomUUID() + '.' + extname;
  //         callback(null, filename);
  //       },
  //     }),
  //     limits: {
  //       fileSize: 20 * 1024 ** 2,
  //     },
  //     fileFilter(req, file, callback) {
  //       callback(null, file.mimetype.startsWith('image/'));
  //     },
  //   }),
  // )
  // updateSpecificReportRecord(
  //   @UploadedFiles() images: Express.Multer.File[],
  //   @Body() createIncidentReportDto: CreateIncidentReportDto,
  //   @Param('id') id: number,
  // ) {
  //   createIncidentReportDto.filenames = images.map((file) => file.filename);
  //   return this.reportIncidentHistoryService.updateSpecificReportRecord(
  //     createIncidentReportDto,
  //     id,
  //   );
  // }
}
