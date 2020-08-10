import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AccountsModule} from "../accounts/accounts.module";
import { AuthController } from './auth.controller';
import {LocalStrategy} from "./local.strategy";
import { PassportModule } from '@nestjs/passport';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [AccountsModule, PassportModule, ConfigModule, JwtModule.registerAsync(({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`}
    })
  }))],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
