import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';

@Controller('blog')
@ApiTags('文章相关')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('list')
  @ApiOperation({ summary: '显示博客列表' })
  async getArticleList() {
    return await this.blogService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: '博客详情' })
  getArticle(@Param('id') id: string) {
    return this.blogService.blog(id);
  }

  @Post()
  @ApiOperation({ summary: '创建博客' })
  async createArticle(@Body() body: CreateBlogDto) {
    const {
      title,
      content,
      type,
      tags,
      rewardsOpen,
      copyrightOn,
      commentable,
      published,
      frontCover,
    } = body;
    const dto = new CreateBlogDto(
      title,
      content,
      type,
      tags,
      rewardsOpen,
      copyrightOn,
      commentable,
      published,
      frontCover,
    );
    await this.blogService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新博客' })
  async updateArticle(@Param('id') id: string, @Body() body: UpdateBlogDto) {
    const {
      title,
      content,
      type,
      tags,
      rewardsOpen,
      copyrightOn,
      commentable,
      published,
      frontCover,
    } = body;
    const dto = new UpdateBlogDto(
      title,
      content,
      type,
      tags,
      rewardsOpen,
      copyrightOn,
      commentable,
      published,
      frontCover,
    );
    await this.blogService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除博客' })
  async removeArticle(@Param('id') id: string) {
    await this.blogService.remove(id);
  }
}
