import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../interfaces/blog.interface';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';
import {
  ApiErrorCode,
  ApiErrorMessage,
} from '../../common/enums/api-error-code.enum';
@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  /**
   * 新建博文
   * @param {CreateBlogDto} createBlogDto
   */
  async create(createBlogDto: CreateBlogDto) {
    try {
      const createdBlog = new this.blogModel(createBlogDto);
      await createdBlog.save();
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_CREATE_ERROR,
        message: '博客创建失败',
      };
    }
  }

  /**
   * 通过id删除博文
   * @param id
   */
  async remove(id) {
    await this.blogModel.findByIdAndDelete(id);
  }

  /**
   * 更新博文
   * @param id
   * @param updateBlogDto
   */
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.blogModel.findByIdAndUpdate(id, updateBlogDto);
  }

  /**
   * 博文列表
   */
  async list() {
    try {
      const list = await this.blogModel.find(
        {},
        {
          _id: 1,
          title: 1,
          type: 1,
          tags: 1,
          views: 1,
          frontCover: 1,
          content: 1,
          updatedAt: 1,
          createdAt: 1,
        },
      );
      list.forEach(item => {
        // 只显示前100字
        item.content = item.content.substring(0, 200);
      });
      return {
        code: ApiErrorCode.SUCCESS,
        data: list,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_LIST_GET_ERROR,
        message: ApiErrorMessage.BLOG_LIST_GET_ERROR,
      };
    }
  }

  /**
   * 根据id查找博客
   * @param id
   */
  async blog(id) {
    return this.blogModel.findById(id);
  }

  /**
   * 查找分类和标签
   */
  async findTypeAndTags() {
    try {
      const type = await this.blogModel.distinct('type');
      const tags = await this.blogModel.distinct('tags');
      return {
        code: ApiErrorCode.SUCCESS,
        data: {
          type,
          tags,
        },
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_INFO_ERROR,
        message: '查询博客分类标签出错',
      };
    }
  }
}
