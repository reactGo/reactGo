import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/userlist';

const cx = classNames.bind(styles);

const UserList = (props) => {

  const renderUsers = () => {
    if(props.users.length > 0) {
      return (
        <ul>
          {props.users.map( (val, index) => {
              return (
              <li
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
