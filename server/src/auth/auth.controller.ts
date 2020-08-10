import {
  Body,
  Controller,
  HttpCode,
  Req,
  HttpStatus,
  Post,
  UseGuards, Get
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import RegisterDto from "./register.dto";
import DatabaseErrorCode from "../database/databaseErrorCode";
import AuthResponse from "./account-response.dto";
import {LocalAuthenticationGuard} from "./local-auth.guard";
import LoginDto from "./login.dto";
import RequestWithAccount from "./request-with-account.interface";
import JwtAuthenticationGuard from "./jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async register(@Body() register: RegisterDto): Promise<AuthResponse> {
    try {
      const createdAccount = await this._authService.register(register);
      return new AuthResponse(false, createdAccount);
    } catch (e) {
      if (e.code === DatabaseErrorCode.DuplicateError) {
        return new AuthResponse(true,  'DuplicateError');
      }
      return new AuthResponse(true,  'e.message');
    }
  }
  @UseGuards(LocalAuthenticationGuard)
  @HttpCode(200)
  @Post('login')
  async logIn(@Req() req: RequestWithAccount, @Body() account: LoginDto): Promise<AuthResponse> {
    const {user} = req;
    const cookie = this._authService.getCookieWithJwtToken(user.id);
    req.res.setHeader('Set-Cookie', cookie);
    return new AuthResponse(false,user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(200)
  @Post('logout')
  async logOut(@Req() req: RequestWithAccount) {
    req.res.setHeader('Set-Cookie',  this._authService.getCookieForLogOut());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() req: RequestWithAccount): AuthResponse {
    return new AuthResponse(false, req.user);
  }

}
