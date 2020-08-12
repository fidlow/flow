import {
  Body,
  Controller,
  HttpCode,
  Req,
  Post,
  UseGuards, Get, SerializeOptions, Put
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import RegisterDto from "./dto/register.dto";
import DatabaseErrorCode from "../database/databaseErrorCode";
import AuthResponse from "./account-response.dto";
import {LocalAuthenticationGuard} from "./guards/local-auth.guard";
import LoginDto from "./dto/login.dto";
import RequestWithAccount from "./interfaces/request-with-account.interface";
import JwtAuthenticationGuard from "./guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "./roles.guard";
import CreateRoleDto from "../accounts/create-role.dto";
import AddRoleAccount from "../accounts/add-role-account.dto";
import { Roles } from "./roles.decorator";
import { AccountEntity } from "../accounts/account.entity";
import UpdateAccountDto from "../accounts/update-account.dto";

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
      return new AuthResponse(true,  e.message);
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

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Get()
  authenticate(@Req() req: RequestWithAccount): AuthResponse {
    return new AuthResponse(false, req.user);
  }
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles('admin')
  @Put('account')
  async updateAccount(@Body() account: UpdateAccountDto): Promise<AuthResponse> {
    try {
      await this._authService.updateAccount(account.id, account);
      return new AuthResponse(false, null);
    } catch (e) {
      return new AuthResponse(true, e.message);
    }
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles('admin')
  @Post('role')
  async createRole(@Body() role: CreateRoleDto): Promise<AuthResponse> {
    try {
      const createdRole = await this._authService.createRole(role);
      return new AuthResponse(false, createdRole);
    } catch (e) {
      return new AuthResponse(true,  e.message);
    }
  }
  @SerializeOptions({groups: ['get']})
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles('admin')
  @Get('roles')
  async getAllRole(): Promise<AuthResponse> {
    try {
      const roles = await this._authService.getAllRoles();
      return new AuthResponse(false, roles);
    } catch (e) {
      return new AuthResponse(true,  e.message);
    }
  }

  @SerializeOptions({groups: ['get']})
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles('admin')
  @Get('accounts')
  async getAllAccounts(): Promise<AuthResponse> {
    try {
      const createdAccount = await this._authService.getAllAccountsWithPermissions();
      return new AuthResponse(false, createdAccount);
    } catch (e) {
      return new AuthResponse(true,  e.message);
    }
  }
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Post('account/addrole')
  async addRoleToAccount(@Body() rta: AddRoleAccount): Promise<AuthResponse> {
    try {
      const isAdded = await this._authService.addRoleToAccount(rta.roleId, rta.accountId);
      return new AuthResponse(!isAdded, null);
    } catch (e) {
      return new AuthResponse(true,  e.message);
    }
  }
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @HttpCode(200)
  @Post('account/removerole')
  async removeRoleFromAccount(@Body() rta: AddRoleAccount): Promise<AuthResponse> {
    try {
      const isAdded = await this._authService.removeRoleFromAccount(rta.roleId, rta.accountId);
      return new AuthResponse(!isAdded, null);
    } catch (e) {
      return new AuthResponse(true,  e.message);
    }
  }
}
