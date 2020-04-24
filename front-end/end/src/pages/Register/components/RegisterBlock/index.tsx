import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Message, Form } from '@alifd/next';

import { useRequest } from 'ice';
import { useHistory } from 'react-router-dom';
import { useInterval } from './utils';
import styles from './index.module.scss';

const { Item } = Form;

export interface IRegisterProps {
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  code: string;
  nickname: string;
}

export default function RegisterBlock() {
  const history = useHistory();
  const [postData, setValue] = useState({
    nickname: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    code: ''
  });
  const [isRunning, checkRunning] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : null
  );

  const formChange = (value: IRegisterProps) => {
    setValue(value);
  };

  const sendCode = (values: IRegisterProps, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
    console.log('%c别看了验证码随便填', 'color:#48BB31;font-size:20px;');
  };

  const checkPass = (
    rule: {},
    values: string,
    callback: (errors?: string) => void
  ) => {
    if (values && values !== postData.password) {
      return callback('密码不一致');
    } else {
      return callback();
    }
  };

  const { loading, request, error } = useRequest({
    url: 'http://127.0.0.1:3000/user/register',
    method: 'POST'
  });

  const handleSubmit = async (values: IRegisterProps, errors: []) => {
    if (errors) {
      return;
    }
    try {
      await request({
        data: {
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
          code: values.code,
          nickname: values.nickname
        }
      });
      Message.success('注册成功');
      history.push('/user/login');
    } catch (err) {
      // ToDo 接口错误直接反应的相关字段
      // axios把接口返回的(4xx-5xx)错误放在 error.response 里面了
      if (!err.response) {
        Message.error(err.message);
      }
    }
  };

  return (
    <div className={styles.RegisterBlock}>
      <div className={styles.innerBlock}>
        <a href="#">
          <img
            className={styles.logo}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
            alt="logo"
          />
        </a>
        <p className={styles.desc}>注册账号</p>

        <Form value={postData} onChange={formChange} size="large">
          <Item required requiredMessage="必填">
            <Input
              name="nickname"
              size="large"
              maxLength={20}
              placeholder="昵称"
            />
          </Item>
          <Item format="email" required requiredMessage="必填">
            <Input
              name="email"
              size="large"
              maxLength={20}
              placeholder="邮箱"
            />
          </Item>
          <Item required requiredMessage="必填">
            <Input.Password
              name="password"
              size="large"
              htmlType="password"
              placeholder="至少六位密码，区分大小写"
            />
          </Item>
          <Item
            required
            requiredTrigger="onFocus"
            requiredMessage="必填"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            validator={checkPass}
          >
            <Input.Password
              name="rePassword"
              size="large"
              htmlType="password"
              placeholder="确认密码"
            />
          </Item>
          <Item format="tel" required requiredMessage="必填" asterisk={false}>
            <Input
              name="phone"
              size="large"
              innerBefore={
                <span className={styles.innerBeforeInput}>
                  +86
                  <span className={styles.line} />
                </span>
              }
              maxLength={20}
              placeholder="手机号"
            />
          </Item>
          <Item required requiredMessage="必填">
            <Input
              name="code"
              size="large"
              innerAfter={
                <span className={styles.innerAfterInput}>
                  <span className={styles.line} />
                  <Form.Submit
                    text
                    type="primary"
                    style={{ width: 64 }}
                    disabled={isRunning}
                    validate={['phone']}
                    onClick={sendCode}
                    className={styles.sendCode}
                  >
                    {isRunning ? `${second}秒后再试` : '获取验证码'}
                  </Form.Submit>
                </span>
              }
              maxLength={20}
              placeholder="验证码"
            />
          </Item>
          {error && error.response && (
            <div className={styles.error}>{error.response.data.message}</div>
          )}
          <Item>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
              loading={loading}
            >
              注册账号
            </Form.Submit>
          </Item>
          <Item style={{ textAlign: 'center' }}>
            <a href="/#/user/login" className={styles.link}>
              使用已有账号登录
            </a>
          </Item>
        </Form>
      </div>
    </div>
  );
}

RegisterBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  value: PropTypes.object
};

RegisterBlock.defaultProps = {
  value: {}
};
