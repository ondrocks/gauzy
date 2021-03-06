import {
	Controller,
	HttpStatus,
	Get,
	Post,
	UseInterceptors,
	UploadedFiles,
	Injectable
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OnDestroy } from '@angular/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImportAllService } from '.';

@Injectable()
@ApiTags('Import')
@Controller()
export class ImportAllController implements OnDestroy {
	constructor(private importAllService: ImportAllService) {}

	@ApiTags('Import')
	@ApiOperation({ summary: 'Find all exports.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found tables'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get()
	async importAll() {
		await this.importAllService.unzip();
		return 'Test: Ok';
	}
	@Post()
	@UseInterceptors(
		FileInterceptor('zip', {
			storage: diskStorage({
				destination: './import',
				filename: (rq, file, cb) => {
					cb(null, 'export.zip');
				}
			})
		})
	)
	async uploadFile(@UploadedFiles() file) {}

	ngOnDestroy() {}
}
