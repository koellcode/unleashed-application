import Prisma from '@prisma/client';
import express from 'express';
import bodyParser from 'body-parser';
import serve from 'express-static';
import path from 'path';
import cookieParser from 'cookie-parser';
import userApi from './api/user';

// eslint-disable-next-line
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const prisma = new Prisma.PrismaClient();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', userApi(prisma));

app.use((req, res, next) => {
  if (req.url === '/login' || req.url === '/signup') {
    return next();
  }
  // super naive check if this is an assets, i couldn't convince parcel bundler to ref all the assets in its own namespace
  if (req.url.includes('.')) {
    return next();
  }

  // check valid token here later
  if (req.cookies.JWT_TOKEN) {
    return next();
  }
  return res.redirect('/login');
});

app.get(['/login', '/signup'], (req, res) =>
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
);

app.use(serve(`dist`));

app.use((error, req, res, next) => {
  console.log('Error Handling Middleware called', error);
  return res.status(500).send();
});

app.listen(3000);
