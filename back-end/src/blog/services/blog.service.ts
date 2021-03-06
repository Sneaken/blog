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
  async list(currentPage) {
    try {
      const list = await this.blogModel.aggregate([
        { $match: { published: true } },
        { $sort: { updatedAt: -1 } },
        { $skip: ((currentPage ?? 1) - 1) * 10 },
        { $limit: 10 },
        {
          $project: {
            title: 1,
            frontPart: 1,
            type: 1,
            tags: 1,
            views: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
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
   * 最火5篇博文列表
   */
  async hotList() {
    try {
      const list = await this.blogModel.aggregate([
        { $match: { published: true } },
        { $sort: { views: -1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 1,
            title: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      return {
        code: ApiErrorCode.SUCCESS,
        data: list,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_LIST_HOT_ERROR,
        message: ApiErrorMessage.BLOG_LIST_HOT_ERROR,
      };
    }
  }

  /**
   * 根据id查找博客
   * @param id
   */
  async blog(id) {
    try {
      const data = await this.blogModel.findById(id, {
        __v: 0,
      });
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
        if (key === 'currentPage') return;
        if (key !== 'title') {
          if (query[key] === '1') {
            queryList[key] = true;
          } else if (query[key] === '0') {
            queryList[key] = false;
          } else {
            queryList[key] = query[key] || 0;
          }
        }
      });
      const promise1 = this.blogModel.aggregate([
        {
          $match: {
            title: { $regex: query?.title?.trim() ?? '', $options: '$i' }, // 忽略大小写
            ...queryList,
          },
        },
        {
          $count: 'count',
        },
      ]);
      const promise2 = this.blogModel.aggregate([
        {
          $match: {
            title: { $regex: query?.title?.trim() ?? '', $options: '$i' }, // 忽略大小写
            ...queryList,
          },
        },
        { $sort: { updatedAt: -1 } },
        { $skip: ((query.currentPage ?? 1) - 1) * 10 },
        { $limit: 10 },
        { $project: { frontPart: 0, __v: 0 } },
      ]);
      const total = await promise1;
      const list = await promise2;
      return {
        code: ApiErrorCode.SUCCESS,
        data: {
          total: total[0]?.count ?? 0,
          currentPage: query.currentPage,
          list,
        },
      };
    } catch (e) {
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
        message: ApiErrorMessage.BLOG_INFO_ERROR,
      };
    }
  }

  /**
   * 查询博主信息
   */
  async getAuthorInfo() {
    try {
      const [blog, type, tags] = await Promise.all([
        this.blogModel.distinct('_id'),
        this.blogModel.distinct('type'),
        this.blogModel.distinct('tags'),
      ]);
      return {
        code: ApiErrorCode.SUCCESS,
        data: {
          blogs: blog.length,
          types: type.length,
          tags: tags.length,
        },
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_INFO_AUTHOR_ERROR,
        message: ApiErrorMessage.BLOG_INFO_AUTHOR_ERROR,
      };
    }
  }

  /**
   * 更新阅读量
   */
  async reportViews(_id: string) {
    try {
      // 高并发下没毛病 自动加1
      await this.blogModel.findByIdAndUpdate(_id, { $inc: { views: 1 } });
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.BLOG_INFO_AUTHOR_ERROR,
        message: ApiErrorMessage.BLOG_INFO_AUTHOR_ERROR,
      };
    }
  }
}
