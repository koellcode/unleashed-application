import express from 'express';
import asyncHandler from 'express-async-handler';
import Prisma from '@prisma/client';
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
        if (
          error instanceof Prisma.Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          return res.status(400).json({ message: 'emailnotavailableerror' });
        }

        throw error;
      }
    })
  );

  return app;
};

export default userApi;
