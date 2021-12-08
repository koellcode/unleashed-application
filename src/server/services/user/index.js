export default (db) => {
  return {
    register: (user) => db.user.create({ data: user }),
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
