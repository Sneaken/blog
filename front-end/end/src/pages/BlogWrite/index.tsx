import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import WriteBlock from './components/WriteBlock';

const { Cell } = ResponsiveGrid;

const BlogWrite = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="开始你的博客生涯"
          description="是时候展现你真正的技术了！"
          breadcrumbs={[{ name: '博客相关' }, { name: '写博客' }]}
        />
      </Cell>
      <Cell colSpan={12}>
        <WriteBlock />
      </Cell>
    </ResponsiveGrid>
  );
};

export default BlogWrite;
