import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../interfaces/blog.interface';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';
@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  /**
   * 新建博文
   * @param {CreateBlogDto} createBlogDto
   */
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
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
      },
    );
    list.forEach(item => {
      // 只显示前100字
      item.content = item.content.substring(0, item.content.length * 0.3);
    });
    return list;
  }
  async blog(id) {
    return this.blogModel.findById(id);
  }
}
