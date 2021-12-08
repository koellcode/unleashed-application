import express from 'express';
import userService from '../../services/user';

const userApi = (db) => {
  const app = express();
  const users = userService(db);

  app.post('/register', async (req, res, next) => {
    await users.register(req.body);
    next();
  });

  return app;
};

export default userApi;
