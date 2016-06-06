
let users = [];

export const getUserList = () => {
  return users;
}

export const addUser = (username) => {
  users.push(username);
}

export const removeAUser = (username) => {

  let index = users.findIndex( (item) => {
    return item === username
  });

  console.log('remove index', index);
  const firstList = users.slice(0, index);
  const lastList  = users.slice(index, users.length-1);

  console.log('firstList', firstList);
  console.log('lastList', lastList);

  users = [].concat(firstList, lastList);

  console.log('USERS IS NOW', users);

  //return Array.from(firstList, lastList);
}
