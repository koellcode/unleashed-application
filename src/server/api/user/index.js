import express from 'express';
import asyncHandler from 'express-async-handler';
import Prisma from '@prisma/client';
import jwt from 'jsonwebtoken';

import { UserError } from '../../../common/validation/user';
import userService from '../../services/user';

const userApi = (db) => {
  const app = express();
  const users = userService(db);

  app.get(
    '/user',
    asyncHandler(async (req, res) => {
      try {
        const user = jwt.verify(req.cookies.JWT_TOKEN, process.env.TOKEN_SECRET);
        return res.send(user);
      } catch (error) {
        return res.status(401).send();
      }
    })
  );
  app.post(
    '/login',
    asyncHandler(async (req, res) => {
      const valid = await users.isValid(req.body);
      if (!valid) {
        return res.status(401).send();
      }

      const user = await users.getUserByEmail(req.body.email);

      const token = jwt.sign({ ...user, password: undefined }, process.env.TOKEN_SECRET);
      res.cookie('JWT_TOKEN', token, {
        // secure: true,
        httpOnly: true,
        // domain: `.${DOMAIN}`,
      });
      return res.json({ ...user, password: undefined, id: undefined });
    })
  );
  app.post(
    '/register',
    asyncHandler(async (req, res) => {
      try {
        const user = await users.register(req.body);
        const token = jwt.sign({ ...user, password: undefined }, process.env.TOKEN_SECRET);
        res.cookie('JWT_TOKEN', token, {
          // secure: true,
          httpOnly: true,
          // domain: `.${DOMAIN}`,
        });
        return res.json({ ...user, password: undefined });
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

  app.post(
    '/logout',
    asyncHandler(async (req, res) => {
      res.clearCookie('JWT_TOKEN');
      res.status(200).send();
    })
  );

  return app;
};

export default userApi;
