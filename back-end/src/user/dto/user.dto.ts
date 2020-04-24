import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: '昵称', example: 'nickname' })
  nickname: string;
  @ApiProperty({ description: '邮箱', example: 'xxx@qq.com' })
  email: string;
  @ApiProperty({ description: '手机', example: '137xx' })
  phone: string;
  @ApiProperty({ description: '密码', example: '!@#$%^' })
  password: string;

  constructor(
    nickname: string,
    email: string,
    phone: string,
    password: string,
  ) {
    this.nickname = nickname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', example: 'username' })
  username: string;
  @ApiProperty({ description: '密码', example: '!@#$%^' })
  password: string;
}

export class EmailLoginUserDto {
  @ApiProperty({ description: '邮箱', example: 'xxx@qq.com' })
  email: string;
  @ApiProperty({ description: '密码', example: '!@#$%^' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
export class PhoneLoginUserDto {
  @ApiProperty({ description: '手机', example: '137xx' })
  phone: string;
  @ApiProperty({ description: '密码', example: '!@#$%^' })
  password: string;

  constructor(phone: string, password: string) {
    this.phone = phone;
    this.password = password;
  }
}
