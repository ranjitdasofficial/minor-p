import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SwappingController } from './swapping/swapping.controller';
import { SwappingModule } from './swapping/swapping.module';
import { SwappingService } from './swapping/swapping.service';
import { MinioModule } from 'nestjs-minio-client';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot(), SwappingModule,MinioModule.register({
    endPoint:"localhost",
    port: 9000,
    useSSL: false,
    accessKey: "e4vur0bvXKenxkgO4bVN",
    secretKey: "f8NV77eMIQIkHNTN0JtYPwXJNSW525xdFuFIBZBW",
  }),MulterModule.register({
    dest: './uploads', // Set your upload directory
  })],
  controllers: [UserController,AuthController, SwappingController],
  providers: [AuthService,PrismaService,UserService,JwtService,SwappingService],
})
export class AppModule {}
