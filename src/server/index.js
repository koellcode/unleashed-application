import Prisma from '@prisma/client';
import express from 'express';
import bodyParser from 'body-parser';

import userApi from './api/user';

const prisma = new Prisma.PrismaClient();

const app = express();

app.use(bodyParser.json());

app.use(userApi(prisma));

app.use((error, req, res, next) => {
  console.log('Error Handling Middleware called');
  return res.status(500).send();
});

app.listen(3000);
