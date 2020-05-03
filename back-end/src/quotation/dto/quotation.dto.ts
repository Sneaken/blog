import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotationDto {
  @ApiProperty({
    description: '英文',
    example: 'You have to do the best what God gave you.',
  })
  english: string;
  @ApiProperty({
    description: '对应中文翻译',
    example: '你必须尽力发挥上帝所赐予你的。',
  })
  chinese: string;

  constructor(english: string, chinese: string) {
    this.english = english;
    this.chinese = chinese;
  }
}
