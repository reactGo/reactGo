import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/userlist';

const cx = classNames.bind(styles);

const UserList = (props) => {

  const renderUsers = () => {


    const selectClass = (index, selIndex) => {
      let selClass = selIndex === index ? 'sel' : '';
      return selClass;
    }

    let {self, users} = props;

    let selIndex = users.findIndex( (user) => {
      return user === self;
    });

    if(users.length > 0) {
      return (
        <ul>
          {users.map( (val, index) => {
              return (
              <li
                className={selectClass(index, selIndex)}
                key={index}
              >
                {val}
              </li>);
            }
          )}
        </ul>
      );
    }

    return (
      <p>No One is in the lobby</p>
    );
  };

  return (
    <div className={cx('userlist')}>
      <h2>CURRENT USERS</h2>
      {renderUsers()}
    </div>
  );
};

export default UserList;
