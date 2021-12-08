export class UserError extends Error {}

export default (user) => {
  if (!user) {
    throw new UserError('noinputgiven');
  }
  if (!user.name) {
    throw new UserError('nousernamegiven');
  }
  if (user.name.length < 5) {
    throw new UserError('usernamemin5charserror');
  }
  if (!user.email) {
    throw new UserError('noemailgiven');
  }
  if (!user.password) {
    throw new UserError('nopasswordgiven');
  }
  if (user.password.length < 8) {
    throw new UserError('passwordmin8charserror');
  }
  if (!user.password.match(/\d/) || !user.password.match(/[a-zA-Z]/)) {
    throw new UserError('passwordnonumberfound');
  }
};
