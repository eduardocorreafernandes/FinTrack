import UsersRouter from './routers/UsersRouters.js';
import LoginRouter from './routers/loginRouter.js';
import express from 'express';
import CadastroRouter from './routers/CadastroRouter.js';
import TransactionsRouter from './routers/TransactionsRouter.js';
import CategoriesRouter from './routers/CategoriesRouter.js';
import jwt from 'jsonwebtoken';
import path from 'path';

const app = express();
const SECRET = process.env.JWT_SECRET || 'default_secret';

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  if (req.headers.cookie) {
    const tokenCookie = req.headers.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
  }

  return null;
}

function authMiddleware(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.redirect('/login.html');
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.redirect('/login.html');
  }
}

app.use(express.json());
app.get('/', (req, res) => res.redirect('/login.html'));
app.get('/index.html', authMiddleware, (req, res) => {
  res.sendFile(path.resolve('public/index.html')); 
});
app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/cadastro', CadastroRouter);
app.use(express.static('public'));
app.use('/transactions', TransactionsRouter);
app.use('/transactions',TransactionsRouter);
app.use('/categories', CategoriesRouter);
const PORT = 3000;
try {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
} catch (err) {
  console.log(err);
}
