import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { SwappingController } from 'src/swapping/swapping.controller';

@Module({
  controllers: [AuthController],
  providers:[UserService,PrismaService,JwtService,AuthService]
})
export class AuthModule {}
