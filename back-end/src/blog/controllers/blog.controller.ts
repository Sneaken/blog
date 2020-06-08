import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ApiException } from '../../common/exceptions/api.exception';
import { ReportService } from '../../report/service/report.service';
import { ListConditionPipe } from '../pipes/list-condition.pipe';

@Controller('blog')
@ApiTags('文章相关')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly reportService: ReportService,
  ) {}

  @Get('info')
  @ApiOperation({ summary: '获取全部分类和标签' })
  async typeAndTags() {
    const result = await this.blogService.findTypeAndTags();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
  @Get('info/author')
  @ApiOperation({ summary: '获取类目数量' })
  async authorInfo() {
    const result = await this.blogService.getAuthorInfo();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get('condition')
  @ApiOperation({ summary: '按条件查询' })
  async condition(@Query(new ListConditionPipe()) query) {
    const result = await this.blogService.queryByCondition(query);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get('list/hot')
  @ApiOperation({ summary: '显示最火的5篇博文' })
  async getLatestArticleList() {
    const result = await this.blogService.hotList();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get('list/:currentPage?')
  @ApiOperation({ summary: '显示博客列表' })
  async getArticleList(@Param('currentPage') currentPage: string) {
    const result = await this.blogService.list(currentPage);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get('visits')
  @ApiOperation({ summary: '统计访问量' })
  async statisticsVisits() {
    const result = await this.reportService.handleVisits();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: '博客详情' })
  async getArticle(@Param('id') id: string) {
    const result = await this.blogService.blog(id);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
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
      frontPart,
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
      frontPart,
    );
    const result = await this.blogService.create(dto);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
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
      frontPart,
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
      frontPart,
    );
    const result = await this.blogService.update(id, dto);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除博客' })
  async removeArticle(@Param('id') id: string) {
    const result = await this.blogService.remove(id);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
