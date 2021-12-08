import express from 'express';
import asyncHandler from 'express-async-handler';
import userService from '../../services/user';

const userApi = (db) => {
  const app = express();
  const users = userService(db);

  app.post(
    '/register',
    asyncHandler(async (req, res) => {
      const user = await users.register(req.body);
      return res.json(user);
    })
  );

  return app;
};

export default userApi;
