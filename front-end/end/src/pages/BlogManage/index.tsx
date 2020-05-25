import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import BlogList from '@/pages/BlogManage/components/BlogList';
import PageHeader from '../../components/PageHeader';

const { Cell } = ResponsiveGrid;

const BlogListPage = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="博客列表信息"
          breadcrumbs={[{ name: '博客相关' }, { name: '博客列表' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <BlogList />
      </Cell>
    </ResponsiveGrid>
  );
};

export default BlogListPage;
