import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/userlist';

const cx = classNames.bind(styles);

const UserList = (props) => {

  const uuidToColor = (uuid) => {
    console.log('uuidToColor',uuid);

    var parts = uuid.split('-');
    var ints = parts.map(function(d) { return parseInt(d,16) });
    var code = ints[0]

    var blue = (code >> 16) & 31;
    var green = (code >> 21) & 31;
    var red = (code >> 27) & 31;
    var foreColor = "rgb(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ")";
    return foreColor;
  }


  const renderUsers = () => {


    const selectClass = (index, selIndex) => {
      let selClass = selIndex === index ? 'sel' : '';
      return selClass;
    }

    const colorStyle = (username) => {
      return {
        color:uuidToColor(username)
      };
    }

    let {self, users} = props;

    let selIndex = users.findIndex( (user) => {
      return user === self;
    });

    const displayName = (name) => {
      if(name === props.self){
        name += ' (You)';
      }
      return name;
    }

    if(users.length > 0) {
      return (
        <div className={cx('listwrap')}>
          <ul>
            {users.map( (val, index) => {
                return (
                <li
                  className={selectClass(index, selIndex)}
                  key={index}
                >
                  <p style={colorStyle(val)}>{displayName(val)}</p>
                </li>);
              }
            )}
          </ul>
        </div>
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
