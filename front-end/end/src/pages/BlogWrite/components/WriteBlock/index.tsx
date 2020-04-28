import React, { useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import {
  Box,
  Button,
  Card,
  Form,
  Input,
  Select,
  Balloon,
  Switch,
  Field,
  Message,
} from '@alifd/next';
import { findDOMNode } from 'react-dom';
import { useRequest } from 'ice';
import styles from './index.module.scss';

const { Tooltip } = Balloon;
const mdParser = new MarkdownIt(/* Markdown-it options */);

const WriteBlock: React.FunctionComponent = (): JSX.Element => {
  const [content, setContent] = useState('');
  const containerRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [dataSource, setDataSource] = useState({
    type: [],
    tags: [],
  });

  const { request: typeRequest } = useRequest({
    url: 'http://127.0.0.1:3000/blog/info',
    method: 'GET',
  });
  useEffect(() => {
    // 自适应宽度
    // eslint-disable-next-line react/no-find-dom-node
    const dom = findDOMNode(containerRef.current) as HTMLDivElement;
    const rect = (dom && dom.getBoundingClientRect()) || {};
    setLeft(rect.left);
    setRight(document.documentElement.offsetWidth - rect.left - rect.width);
    // 请求分类和标签列表
    typeRequest()
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch(e => {
        console.log('%ce =>', 'color:red;font-size:20px;', e.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const maxTagPlaceholder = (selectedValues, totalValues) => {
    const trigger = (
      <span>{`${selectedValues.length}/${totalValues.length}`}</span>
    );
    const labels = selectedValues.map(obj => obj.label);
    return <Tooltip trigger={trigger}>{labels.join(', ')}</Tooltip>;
  };
  const handleEditorChange = ({ text }) => {
    setContent(text);
  };
  const contentField = Field.useField({ values: {} });
  const settingField = Field.useField({
    values: {
      rewardsOpen: false,
      copyrightOn: false,
      commentable: false,
      published: false,
    },
  });
  const { request: createRequest } = useRequest({
    url: 'http://127.0.0.1:3000/blog',
    method: 'POST',
  });
  const submit = async () => {
    const { errors: contentErrors } = await contentField.validatePromise();
    const { errors: settingErrors } = await settingField.validatePromise();

    if (settingErrors || contentErrors) {
      return;
    }
    try {
      await createRequest({
        data: {
          ...contentField.getValues(),
          ...settingField.getValues(),
        },
      });
      Message.success('创建成功');
    } catch (e) {
      console.error(e.response.data);
    }
  };
  const onCancel = () => {};

  return (
    <div>
      <Card ref={containerRef} free className={styles.Card}>
        <Card.Header title="博客内容" />
        <Card.Divider />
        <Card.Content>
          <Form field={contentField} responsive fullWidth labelAlign="top">
            <Form.Item colSpan={12} required>
              <MdEditor
                name="content"
                htmlClass={styles.Editor}
                value={content}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </Form.Item>
          </Form>
        </Card.Content>
      </Card>
      <Card free className={styles.Card}>
        <Card.Header title="博客设置" />
        <Card.Divider />
        <Card.Content>
          <Form field={settingField} responsive fullWidth labelAlign="top">
            <Form.Item colSpan={4} label="博客标题" required>
              <Input name="title" trim />
            </Form.Item>
            <Form.Item colSpan={4} label="分类" required>
              <Select
                name="type"
                mode="tag"
                dataSource={dataSource.type}
                maxTagCount={2}
                maxTagPlaceholder={maxTagPlaceholder}
              />
            </Form.Item>
            <Form.Item colSpan={4} label="标签" required>
              <Select
                name="tags"
                mode="tag"
                dataSource={dataSource.tags}
                maxTagCount={2}
                maxTagPlaceholder={maxTagPlaceholder}
              />
            </Form.Item>
            <Form.Item colSpan={2} label="赏赞开启" labelAlign="left" required>
              <Switch
                name="rewardsOpen"
                checkedChildren="on"
                unCheckedChildren="off"
              />
            </Form.Item>
            <Form.Item colSpan={2} label="版权开启" labelAlign="left" required>
              <Switch
                name="copyrightOn"
                checkedChildren="on"
                unCheckedChildren="off"
              />
            </Form.Item>
            <Form.Item colSpan={2} label="评论开启" labelAlign="left" required>
              <Switch
                name="commentable"
                checkedChildren="on"
                unCheckedChildren="off"
              />
            </Form.Item>
            <Form.Item colSpan={2} label="发布" labelAlign="left" required>
              <Switch
                name="published"
                checkedChildren="on"
                unCheckedChildren="off"
              />
            </Form.Item>
            <Form.Item colSpan={12} label="封面">
              <Select name="frontCover">
                <Select.Option value={1}>项目一</Select.Option>
                <Select.Option value={2}>项目二</Select.Option>
                <Select.Option value={3}>项目三</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card.Content>
      </Card>
      <Form.Item colSpan={12}>
        <Box
          direction="row"
          spacing={16}
          style={{ left, right }}
          align="center"
          justify="center"
          className={styles.fixedButtons}
        >
          <Form.Submit
            className={styles.Button}
            type="primary"
            onClick={submit}
            validate
          >
            提交
          </Form.Submit>
          <Button className={styles.Button} onClick={onCancel} type="secondary">
            取消
          </Button>
        </Box>
      </Form.Item>
    </div>
  );
};

export default WriteBlock;
