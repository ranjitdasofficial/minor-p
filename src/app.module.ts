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
    endPoint:"4.224.35.195",
    port: 80,
    useSSL: false,
    accessKey: "vXzrmMY3S3JVRYAquzWk",
    secretKey: "Xg6zGT3jGDSyGj05d7p42V7HQap4GWFli7EoC4Qo",
  }),MulterModule.register({
    dest: './uploads', // Set your upload directory
  })],
  controllers: [UserController,AuthController, SwappingController],
  providers: [AuthService,PrismaService,UserService,JwtService,SwappingService],
})
export class AppModule {}
