import express from 'express';
import asyncHandler from 'express-async-handler';
import { UserError } from '../../../common/validation/user';
import userService from '../../services/user';

const userApi = (db) => {
  const app = express();
  const users = userService(db);

  app.post(
    '/register',
    asyncHandler(async (req, res) => {
      try {
        const user = await users.register(req.body);
        return res.json(user);
      } catch (error) {
        if (error instanceof UserError) {
          return res.status(400).json({ message: error.message });
        }
        throw error;
      }
    })
  );

  return app;
};

export default userApi;
