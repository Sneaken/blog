import React, { SFC } from 'react';
import { Breadcrumb, Box, Typography } from '@alifd/next';
import styles from './index.module.scss';

export interface IPageHeaderProps {
  breadcrumbs?: { name: string; path?: string }[];
  title?: string;
  description?: string;
}

const PageHeader: SFC<IPageHeaderProps> = props => {
  const { breadcrumbs, title, description, ...others } = props;
  return (
    <Box spacing={8} className={styles.PageHeader} {...others}>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumb className={styles.Breadcrumbs} separator=" / ">
          {breadcrumbs.map(item => (
            <Breadcrumb.Item link={item.path} key={item.name}>
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      ) : null}

      {title && (
        <Typography.Text className={styles.Title}>{title}</Typography.Text>
      )}

      {description && (
        <Typography.Text className={styles.Description}>
          {description}
        </Typography.Text>
      )}
    </Box>
  );
};

export default PageHeader;
