import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Pagination,
  Divider,
  ResponsiveGrid,
  Button,
  Box,
  Form,
  Input,
  Select,
  Icon,
  Loading,
  Tag,
  Message,
  Field,
  Balloon,
} from '@alifd/next';

import { useRequest } from 'ice';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const { Option } = Select;
const FormItem = Form.Item;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface TableData {
  createdAt: string;
  published: boolean;
  tags: string[];
  title: string;
  type: string[];
  updatedAt: string;
  views: number;
  _id: string;
  visible: boolean;
}
export interface IDataSource {
  tableData: TableData[] | any[];
  tableColumn: {
    title: string;
    type: string;
    tags: string;
    published: string;
  };
}

interface ITableListProps {
  dataSource: IDataSource;
}

const DEFAULT_PROPS = {
  tableData: [],
  tableColumn: {
    title: '标题',
    type: '分类',
    tags: '标签',
    published: '发布',
    views: '浏览次数',
  },
};

const BlogList: React.FunctionComponent<ITableListProps> = (
  props: ITableListProps,
): JSX.Element => {
  const { dataSource = DEFAULT_PROPS } = props;
  const [tableData, setTableData] = useState(dataSource.tableData);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  // 展开更多
  const [expand, setExpand] = useState(false);

  const field = Field.useField();

  const { request, loading } = useRequest({
    url: 'http://127.0.0.1:3000/blog/condition',
    method: 'get',
  });

  const onSelect = value => {
    // 表单提交用 Form.Submit组件 支持 回车提交 监听 onClick (value,error,field)
    request({
      params: { ...value, currentPage },
    })
      .then(res => {
        const result =
          res.data.list.length > 0
            ? res.data.list.map(item => ({
                ...item,
                visible: false,
              }))
            : res.data.list;
        setTableData(result);
        setTotal(res.data.total);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    onSelect(field.getValues());
  }, [currentPage]);
  const onPaginationChange = value => {
    setCurrentPage(value);
  };

  const toggleSearchList = () => {
    setExpand(!expand);
  };

  const handleEdit = (e, index) => {
    // eslint-disable-next-line no-underscore-dangle
    history.push(`/blog/write/${tableData[index]._id}`);
  };

  const { request: deleteRequest } = useRequest({
    method: 'DELETE',
  });

  const handleBalloonVisible = (index, show) => {
    const result = [...tableData];
    result[index].visible = show;
    setTableData(result);
  };
  const handleDelete = index => {
    deleteRequest({
      // eslint-disable-next-line no-underscore-dangle
      url: `http://127.0.0.1:3000/blog/${tableData[index]._id}`,
    })
      .then(() => {
        onSelect(field.getValues());
        Message.success('删除成功');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderCell = (value?: string | number | boolean | string[]) => {
    if (['string', 'number', 'undefined'].includes(typeof value)) {
      return value;
    } else if (typeof value === 'boolean') {
      return value ? '是' : '否';
    } else {
      return (
        <Tag.Group>
          {(value as string[]).map(tag => (
            <Tag type="primary" size="small" key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </Tag.Group>
      );
    }
  };

  return (
    <>
      <Card free>
        <Card.Content>
          <Box padding={10}>
            <Form field={field} responsive fullWidth labelAlign="top">
              <FormItem colSpan={3} label="标题">
                <Input
                  name="title"
                  placeholder="输入需求标题进行搜索"
                  innerAfter={
                    <Icon
                      type="search"
                      size="xs"
                      className={styles.searchIcon}
                    />
                  }
                  hasClear
                />
              </FormItem>
              <FormItem colSpan={3} label="发布情况">
                <Select placeholder="选择发布情况" name="published" hasClear>
                  <Option value="1">发布</Option>
                  <Option value="0">未发布</Option>
                </Select>
              </FormItem>
              {expand && (
                <>
                  {/* <FormItem colSpan={3} label="分类"> */}
                  {/*  <Select placeholder="选择分类" name="type" hasClear> */}
                  {/*    <Option value="1">发布</Option> */}
                  {/*    <Option value="0">未发布</Option> */}
                  {/*  </Select> */}
                  {/* </FormItem> */}
                  {/* <FormItem colSpan={3} label="标签"> */}
                  {/*  <Select placeholder="选择标签" name="tags" hasClear> */}
                  {/*    <Option value="1">发布</Option> */}
                  {/*    <Option value="0">未发布</Option> */}
                  {/*  </Select> */}
                  {/* </FormItem> */}
                  <FormItem colSpan={3} label="赏赞情况">
                    <Select
                      name="rewardsOpen"
                      placeholder="选择是否开启赏赞情况"
                      hasClear
                    >
                      <Option value="1">开启</Option>
                      <Option value="0">关闭</Option>
                    </Select>
                  </FormItem>
                  <FormItem colSpan={3} label="评论情况">
                    <Select
                      name="commentable"
                      placeholder="选择是否开启评论情况"
                      hasClear
                    >
                      <Option value="1">开启</Option>
                      <Option value="0">关闭</Option>
                    </Select>
                  </FormItem>
                </>
              )}
              <Cell colSpan={3} className={styles.btns}>
                <Box
                  spacing={8}
                  direction="row"
                  align="flex-end"
                  style={{ height: '100%' }}
                >
                  <Form.Submit
                    htmlType="submit"
                    type="primary"
                    onClick={value => onSelect(value)}
                  >
                    查询
                  </Form.Submit>
                  <Form.Reset>重置</Form.Reset>
                  <Button onClick={toggleSearchList}>
                    {expand ? (
                      <>
                        收起{' '}
                        <Icon
                          className={styles.icon}
                          type="arrow-up"
                          size="xs"
                        />
                      </>
                    ) : (
                      <>
                        展开{' '}
                        <Icon
                          className={styles.icon}
                          type="arrow-down"
                          size="xs"
                        />
                      </>
                    )}
                  </Button>
                </Box>
              </Cell>
            </Form>
          </Box>
          <Divider dashed />
          <div className={styles.Main}>
            <Loading visible={loading} style={{ width: '100%' }}>
              <div className={styles.add}>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push('/blog/write');
                  }}
                >
                  新增
                </Button>
              </div>
              <Table className={styles.Table} dataSource={tableData}>
                {Object.keys(dataSource.tableColumn).map(col => (
                  <Table.Column
                    title={dataSource.tableColumn[col]}
                    dataIndex={col}
                    key={col}
                    cell={renderCell}
                  />
                ))}
                <Table.Column
                  title="操作"
                  cell={(value, index) => (
                    <div className={styles.opt}>
                      <Button
                        type="primary"
                        text
                        onClick={e => {
                          handleEdit(e, index);
                        }}
                      >
                        编辑
                      </Button>
                      <Balloon
                        visible={tableData[index].visible}
                        trigger={
                          <Button
                            size="small"
                            style={{ color: '#e72b00' }}
                            text
                            onClick={() => {
                              handleBalloonVisible(index, true);
                            }}
                          >
                            删除
                          </Button>
                        }
                        onClose={() => {
                          handleBalloonVisible(index, false);
                        }}
                        align="bl"
                        triggerType="click"
                      >
                        <div className={styles.Balloon}>
                          是否删除？
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            是
                          </Button>
                        </div>
                      </Balloon>
                    </div>
                  )}
                />
              </Table>
              <Box
                margin={[15, 0, 0, 0]}
                direction="row"
                align="center"
                justify="space-between"
              >
                <div className={styles.total}>
                  共<span>{total}</span>条博客
                </div>
                <Pagination
                  current={currentPage}
                  onChange={onPaginationChange}
                  total={total}
                  hideOnlyOnePage
                />
              </Box>
            </Loading>
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

export default BlogList;
