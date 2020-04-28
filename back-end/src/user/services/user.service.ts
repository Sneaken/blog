import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { RegisterUserDto } from '../dto/user.dto';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  /**
   * 新建用户
   * @param {RegisterUserDto} registerUserDto
   */
  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userModel
      .find(
        {
          $or: [
            //多条件，数组
            { phone: registerUserDto.phone },
            { email: registerUserDto.email },
          ],
        },
        {
          password: 0,
        },
      )
      .limit(1);
    if (user.length !== 0) {
      if (user[0].phone === registerUserDto.phone) {
        return {
          code: ApiErrorCode.USER_PHONE_EXIST,
          message: '手机号已注册',
        };
      } else {
        return {
          code: ApiErrorCode.USER_EMAIL_EXIST,
          message: '邮箱已注册',
        };
      }
    } else {
      const createdUser = new this.userModel(registerUserDto);
      await createdUser.save();
      return {
        code: ApiErrorCode.SUCCESS,
      };
    }
  }

  /**
   * 用户登陆
   */
  async login(account: string, password: string) {
    const user = await this.userModel.find({
      $or: [
        //多条件，数组
        { phone: account },
        { email: account },
      ],
      password: password,
    });
    if (user.length === 1) {
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } else {
      return {
        code: ApiErrorCode.USER_LOGIN_INVALID,
        message: '登录账户或登录密码不正确',
      };
    }
  }

  /**
   * 用户信息
   */
  async userInfo(account: string) {
    const user = await this.userModel
      .find(
        {
          $or: [
            //多条件，数组
            { phone: account },
            { email: account },
          ],
        },
        {
          nickname: 1,
          phone: 1,
          email: 1,
          _id: 0,
        },
      )
      .limit(1);
    if (user.length === 1) {
      return {
        code: ApiErrorCode.SUCCESS,
        message: '',
        data: user[0],
      };
    } else {
      return {
        code: ApiErrorCode.USER_NO_EXIST,
        message: '用户账户不存在',
      };
    }
  }
}
