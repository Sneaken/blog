import React, { useEffect, useState } from 'react';
import { Avatar, Overlay, Menu, Icon } from '@alifd/next';
import { useRequest } from 'ice';
import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

export interface IProps {
  name: string;
  avatar: string;
  mail: string;
}

const UserProfile = ({ name, avatar, mail }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={avatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{name}</h4>
        <span>{mail}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: IProps) => {
  const [data, setData] = useState(props);
  const { name, avatar } = data;

  const { request } = useRequest({
    url: 'http://127.0.0.1:3000/user/info',
    method: 'get',
  });
  useEffect(() => {
    request({ params: { account: 15212849642 } })
      .then(res => {
        const value = {
          name: res.data.nickname,
          mail: res.data.email,
          avatar: props.avatar,
        };
        setData(value);
      })
      .catch(e => {
        console.log('%ce =>', 'color:red;font-size:20px;', e.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const click = (key: string) => {
    if (key === '0-2') {
      console.log('%c退出', 'color:#48BB31;font-size:20px;');
    }
  };
  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={avatar} alt="用户头像" />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        <UserProfile {...data} />
        <Menu className={styles.menu} onItemClick={click}>
          <Item>
            <a href="/#/person">
              <Icon size="small" type="account" />
              个人设置
            </a>
          </Item>
          <Item>
            <a href="/#/settings">
              <Icon size="small" type="set" />
              系统设置
            </a>
          </Item>
          <Item>
            <a href="/#/user/login">
              <Icon size="small" type="exit" />
              退出
            </a>
          </Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: 'MyName',
  mail: 'name@gmail.com',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};

export default HeaderAvatar;
