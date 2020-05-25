import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Divider, Form, Input, Message } from '@alifd/next';

import { useRequest } from 'ice';
import { useInterval } from './utils';
import styles from './index.module.scss';

const { Item } = Form;

export interface IDataSource {
  name: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
}

const DEFAULT_DATA: IDataSource = {
  name: '',
  password: '',
  autoLogin: true,
  phone: '',
  code: '',
};

const LoginBlock: React.FunctionComponent = (): JSX.Element => {
  const history = useHistory();
  const [postData, setValue] = useState(DEFAULT_DATA);
  const [isRunning, checkRunning] = useState(false);
  const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : null,
  );

  const formChange = (values: IDataSource) => {
    setValue(values);
  };

  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
  };
  // error 在jsx里面能获取到 不知道为什么try catch 里面打印不出来
  const { loading, request, error } = useRequest({
    url: 'http://127.0.0.1:3000/user/login',
    method: 'POST',
  });

  const handleSubmit = async (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    try {
      await request({
        data: {
          phone: isPhone ? values.phone : undefined,
          code: isPhone ? values.code : undefined,
          username: isPhone ? undefined : values.name,
          password: isPhone ? undefined : values.password,
        },
      });

      Message.success('登录成功');
      history.push('/');
    } catch (err) {
      // axios把接口返回的(4xx-5xx)错误放在 error.response 里面了
      if (!err.response) {
        Message.error(err.message);
      }
    }
  };

  const phoneForm = (
    <>
      <Item format="tel" required requiredMessage="必填" asterisk={false}>
        <Input
          name="phone"
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
      <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
        <Input
          name="code"
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
    </>
  );

  const accountForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="name" maxLength={20} placeholder="用户名" />
      </Item>
      <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
        <Input.Password
          name="password"
          htmlType="password"
          placeholder="密码"
        />
      </Item>
    </>
  );

  const byAccount = () => {
    checkPhone(false);
  };

  const byForm = () => {
    checkPhone(true);
  };

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <a href="#">
          <img
            className={styles.logo}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
            alt="logo"
          />
        </a>
        <div className={styles.desc}>
          <span onClick={byAccount} className={isPhone ? '' : styles.active}>
            账户密码登录
          </span>
          <Divider direction="ver" />
          <span onClick={byForm} className={isPhone ? styles.active : ''}>
            手机号登录
          </span>
        </div>

        <Form value={postData} onChange={formChange} size="large">
          {isPhone ? phoneForm : accountForm}
          <div className={styles.infoLine}>
            <Item style={{ marginBottom: 0 }}>
              <Checkbox name="autoLogin" className={styles.infoLeft}>
                自动登录
              </Checkbox>
            </Item>
            {error && error.response && (
              <div className={styles.error}>{error.response.data.message}</div>
            )}
            {/* <div> */}
            {/*  <a href="/" className={styles.link}> */}
            {/*    忘记密码 */}
            {/*  </a> */}
            {/* </div> */}
          </div>

          <Item style={{ marginBottom: 10 }}>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
              loading={loading}
            >
              登录
            </Form.Submit>
          </Item>
          {/* <p className={styles.infoLine}> */}
          {/*  <div className={styles.infoLeft}> */}
          {/*    其他登录方式 <Icon type="atm" size="small" />{' '} */}
          {/*    <Icon type="atm" size="small" /> <Icon type="atm" size="small" /> */}
          {/*  </div> */}
          {/*  <a href="/" className={styles.link}> */}
          {/*    注册账号 */}
          {/*  </a> */}
          {/* </p> */}
        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;
