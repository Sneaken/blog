// dto 数据持久类
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ description: '博客标题', example: 'nest.js 第一课' })
  @IsNotEmpty({ message: '博客标题不能为空' })
  title: string;
  @ApiProperty({ description: '博客内容', example: 'nest new blog' })
  @IsNotEmpty({ message: '博客内容不能为空' })
  content: string;
  @ApiProperty({ description: '分类', example: ['javascript', 'node.js'] })
  type: string[];
  @ApiProperty({ description: '标签', example: ['js', 'nest'] })
  tags: string[];
  views: number;
  @ApiProperty({ description: '赏赞开启', example: true })
  rewardsOpen: boolean;
  @ApiProperty({ description: '版权开启', example: true })
  copyrightOn: boolean;
  @ApiProperty({ description: '评论开启', example: true })
  commentable: boolean;
  @ApiProperty({ description: '发布', example: true })
  published: boolean;
  @ApiProperty({ description: '封面', example: 'http://xxx.png' })
  frontCover?: string;

  constructor(
    title: string,
    content: string,
    type: string[],
    tags: string[],
    rewardsOpen: boolean,
    copyrightOn: boolean,
    commentable: boolean,
    published: boolean,
    frontCover: string,
  ) {
    this.title = title;
    this.content = content;
    this.type = type;
    this.tags = tags;
    this.frontCover = frontCover;
    this.rewardsOpen = rewardsOpen;
    this.copyrightOn = copyrightOn;
    this.commentable = commentable;
    this.published = published;
    this.views = 0;
  }
}
export class UpdateBlogDto {
  @ApiProperty({ description: '博客标题', example: 'nest.js 第一课' })
  title: string;
  @ApiProperty({ description: '博客内容', example: 'nest new blog' })
  content: string;
  @ApiProperty({ description: '分类', example: ['javascript', 'node.js'] })
  type: string[];
  @ApiProperty({ description: '标签', example: ['js', 'nest'] })
  tags: string[];
  views: number;
  @ApiProperty({ description: '赏赞开启', example: true })
  rewardsOpen: boolean;
  @ApiProperty({ description: '版权开启', example: true })
  copyrightOn: boolean;
  @ApiProperty({ description: '评论开启', example: true })
  commentable: boolean;
  @ApiProperty({ description: '发布', example: true })
  published: boolean;
  @ApiProperty({ description: '封面', example: 'http://xxx.png' })
  frontCover?: string;

  constructor(
    title: string,
    content: string,
    type: string[],
    tags: string[],
    rewardsOpen: boolean,
    copyrightOn: boolean,
    commentable: boolean,
    published: boolean,
    frontCover: string,
  ) {
    this.title = title;
    this.content = content;
    this.type = type;
    this.tags = tags;
    this.frontCover = frontCover;
    this.rewardsOpen = rewardsOpen;
    this.copyrightOn = copyrightOn;
    this.commentable = commentable;
    this.published = published;
  }
}
