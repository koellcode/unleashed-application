import validateUser from '../../../common/validation/user';

export default (db) => {
  return {
    register: (user) => {
      validateUser(user);
      return db.user.create({ data: user });
    },
    getUserByEmail: (email) =>
      db.user.findUnique({
        select: {
          name: true,
          password: true,
        },
        where: {
          email,
        },
      }),
  };
};
