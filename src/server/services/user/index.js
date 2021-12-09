import * as bcrypt from 'bcrypt';
import validateUser from '../../../common/validation/user';

export default (db) => {
  return {
    register: async (user) => {
      validateUser(user);
      const hash = await bcrypt.hash(user.password, 4);
      return db.user.create({ data: { ...user, password: hash } });
    },
    getUserByEmail: (email) =>
      db.user.findUnique({
        select: {
          name: true,
          password: true,
          email: true,
        },
        where: {
          email,
        },
      }),
  };
};
