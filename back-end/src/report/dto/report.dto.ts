import { ApiProperty } from '@nestjs/swagger';
import { ActionTypeCode } from '../enums/action-type.enum';

export class CreateReportDto {
  @ApiProperty({
    description: '访客id',
    example: '3794c028b250ec83990bd0074bda186b',
  })
  userID: string;
  @ApiProperty({ description: '访客ip(ipv4)', example: '116.232.244.139' })
  ipv4: string;
  @ApiProperty({
    description: 'user-agent',
    example:
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
  })
  ua: string;
  @ApiProperty({ description: '访客动作', example: '1' })
  actionType: ActionTypeCode;

  constructor(
    userID: string,
    ipv4: string,
    ua: string,
    actionType: ActionTypeCode,
  ) {
    this.userID = userID;
    this.ipv4 = ipv4;
    this.ua = ua;
    this.actionType = actionType;
  }
}
