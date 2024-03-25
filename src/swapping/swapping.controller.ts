import { Body, Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SwappingService } from './swapping.service';
import { MinioService } from 'nestjs-minio-client';

import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('swapping')
export class SwappingController {
    constructor(private readonly swappingService:SwappingService,private readonly minioService:MinioService) {}

    @Get("swappingData")
    async getSwappingData(@Query() dto: { branch: string; semester: number; email: string }) {
        return this.swappingService.getAllSwapping(dto);
    }

    @Post("createUserProfile")
    async createUserProfile(@Body() dto:any){
        console.log(dto);
        return this.swappingService.createUserProfile(dto);
    }

    @Post("acceptSwap")
    async acceptSwap(@Body() dto:{
        currentUserEmail:string,
        remoteUserEmail:string,
    }){
        return this.swappingService.acceptSwap(dto);
    }


    @Get("test")
    async getTest(){



        
        const stream = fs.createReadStream("test.txt");
        var fileStat = fs.stat("test.txt", (err, stats)=> {
            if (err) {
              return console.log(err)
            }
            this.minioService.client.putObject('kiitconnect', '40mbfile.txt', stream, stats.size, function (err, objInfo) {
                if (err) {
                  return console.log(err) // err should be null
                }
                console.log('Success', objInfo)
              })
            
        
          })
    }
    

   @Get("download")
    async downloadFile(@Res() response: Response){
         const stream = await this.minioService.client.getObject('test','40mbfile.txt');
    //      response.headers.set('Content-Type', 'application/octet-stream');
    // response.headers.set('Content-Disposition', `attachment; filename="test.txt"`);

        //  stream.pipe(response);
        
    }


    @Post("upload")
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File,  @Body() dto:any){
        console.log(dto);

        return true;

    }
        // return this.swappingService.uploadFile(dto); 
}

