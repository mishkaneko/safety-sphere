import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateIncidentReportDto } from './report-incident.dto';
import { ReportIncidentService } from './report-incident.service';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  NotImplementedException,
} from '@nestjs/common';
import * as multer from 'multer';
import { randomUUID } from 'crypto';

@Controller('report-incident')
export class ReportIncidentController {
  constructor(private reportIncidentService: ReportIncidentService) {}

  @Post('user-report')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: multer.diskStorage({
        destination: 'uploads/user-report-image',
        filename(req, file, callback) {
          // file.originalname.split('.').pop()
          let extname = file.mimetype.split('/').pop().split('.').pop();
          let filename = randomUUID() + '.' + extname;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 20 * 1024 ** 2,
      },
      fileFilter(req, file, callback) {
        callback(null, file.mimetype.startsWith('image/'));
      },
    }),
  )
  postIncidentReport(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createIncidentReportDto: CreateIncidentReportDto,
  ) {
    // console.log('fields:', createIncidentReportDto);
    console.log('images:', images);
    // throw new NotImplementedException();

    createIncidentReportDto.filenames = images.map((file) => file.filename);
    return this.reportIncidentService.postIncidentReport(
      createIncidentReportDto,
    );
  }
}
