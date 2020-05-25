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
        message: ApiErrorMessage.BLOG_CREATE_ERROR,
      };
    }
  }

  /**
   * 通过id删除博文
   * @param id
   */
  async remove(id) {
    try {
      await this.blogModel.findByIdAndDelete(id);
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_DELETE_ERROR,
        message: ApiErrorMessage.BLOG_DELETE_ERROR,
      };
    }
  }

  /**
   * 更新博文
   * @param id
   * @param updateBlogDto
   */
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      await this.blogModel.findByIdAndUpdate(id, updateBlogDto);
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_UPDATE_ERROR,
        message: ApiErrorMessage.BLOG_UPDATE_ERROR,
      };
    }
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
        const result = item.content.substring(0, 300).split('\n');
        if (result.length > 1) {
          result.pop();
        }
        result.push('', '...');
        item.content = result.join('\n');
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
    try {
      const data = await this.blogModel.findById(id);
      return {
        code: ApiErrorCode.SUCCESS,
        data,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_CONTENT_ERROR,
        message: ApiErrorMessage.BLOG_CONTENT_ERROR,
      };
    }
  }

  /**
   * 根据条件查找博客
   * @param query
   */
  async queryByCondition(query) {
    try {
      const queryList = {};
      Object.keys(query).forEach(key => {
        if (key !== 'title') {
          queryList[key] = query[key] || 0;
        }
      });
      const list = await this.blogModel.find(
        {
          title: { $regex: query?.title?.trim() ?? '', $options: '$i' },
          ...queryList,
        },
        {
          frontCover: 0,
          __v: 0,
        },
      );
      return {
        code: ApiErrorCode.SUCCESS,
        data: list,
      };
    } catch (e) {
      console.log(e);
      return {
        code: ApiErrorCode.BLOG_LIST_QUERY_BY_CONDITION_ERROR,
        message: ApiErrorMessage.BLOG_LIST_QUERY_BY_CONDITION_ERROR,
      };
    }
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
