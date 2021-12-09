import * as bcrypt from 'bcrypt';
import validateUser from '../../../common/validation/user';

export default (db) => {
  const register = async (user) => {
    validateUser(user);
    const hash = await bcrypt.hash(user.password, 4);
    return db.user.create({ data: { ...user, password: hash } });
  };

  const getUserByEmail = (email) =>
    db.user.findUnique({
      select: {
        name: true,
        password: true,
        email: true,
      },
      where: {
        email,
      },
    });
  const isValid = async (user) => {
    const foundUser = await getUserByEmail(user.email);
    if (!foundUser) {
      return false;
    }
    const valid = await bcrypt.compare(user.password, foundUser.password);
    return valid;
  };

  return {
    register,
    getUserByEmail,
    isValid,
  };
};
