import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Redirect, Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Redirect('/books')
  redirect(): string {
    return 'not here';
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
      }),
    }),
  )
  @Post('file-upload')
  saveUploadedImage(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  // @Get('/book')
  // @Render('book')
  // getBook() {
  //   return {
  //     image: 'images/book_2.jpg',
  //     name: 'За темными лесами',
  //     author: 'Нил Гейман',
  //     year: '2018',
  //     condition: 'Отличное',
  //     description: '',
  //   };
  // }


}

//   return {
//     exchanges_from: [
//       {
//         name_1: 'Сборник. Кир Булычев',
//         name_2: 'За темными лесами. Нил Гейман',
//         ref_1: 'book',
//         ref_2: 'book',
//       },
//       { name_1: 'Книга_5', name_2: 'Книга_2' },
//     ],
//     exchanges_to: [
//       { name_1: 'Книга_1', name_2: 'Книга_3' },
//       { name_1: 'Книга_1', name_2: 'Книга_4' },
//     ],
//   };
