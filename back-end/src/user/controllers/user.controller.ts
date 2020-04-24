import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { RegisterUserDto } from '../dto/user.dto';
import { ApiException } from '../../common/exceptions/api.exception';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';

@Controller('user')
@ApiTags('后台用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '登录' })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const result = await this.userService.login(username, password);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return result;
  }
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    const registerUserDto = new RegisterUserDto(
      nickname,
      email,
      phone,
      password,
    );
    const result = await this.userService.register(registerUserDto);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(result.message, result.code, HttpStatus.CONFLICT);
    }
    return result;
  }
}
