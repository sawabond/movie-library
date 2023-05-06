const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const sequelize = require('./database');
const User = require('./Entities/User');
const Film = require('./Entities/Film');
const loginRoute = require('./login');
const { cookieJwtAuth } = require('./cookieJwtAuth');
const { Op } = require('sequelize');

sequelize.sync().then(() => console.log('DB is ready'));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

User.count().then(async (res) => {
  if (res === 0) {
    await User.create({
      username: 'Admin',
      password: 'Pa$$w0rd',
      email: 'admin@mail.com',
    });
  }
});

Film.count().then(async (res) => {
  if (res === 0) {
    Promise.all([
      Film.create({
        name: 'Rambo 6',
        year: 1984,
        imdbRating: 8.4,
        isSeries: false,
      }),
      Film.create({
        name: 'Rambo 1',
        year: 1994,
        imdbRating: 9.4,
        isSeries: false,
      }),
      Film.create({
        name: 'Rambo 2',
        year: 1984,
        imdbRating: 5.4,
        isSeries: false,
      }),
      Film.create({
        name: 'Godfather',
        year: 2004,
        imdbRating: 9.4,
        isSeries: true,
      }),
      Film.create({
        name: 'Supernatural',
        year: 2011,
        imdbRating: 9.4,
        isSeries: true,
      }),
      Film.create({
        name: 'Rambo 12',
        year: 1984,
        imdbRating: 9.4,
        isSeries: false,
      }),
    ]);
  }
});

app.put('/my-name', cookieJwtAuth, (req, res) => {
  User.update(
    { name: req.body.name },
    {
      where: {
        id: req.user.id,
      },
    }
  ).then(() => {
    res.send('Your username is updated to ' + req.body.name);
  });
});

app.post('/users', (req, res) => {
  User.create(req.body).then(() => {
    res.send('User is created');
  });
});

app.post('/login', loginRoute);

app.post('/films', cookieJwtAuth, (req, res) => {
  Film.create(req.body).then(() => {
    res.send('Film is created');
  });
});

app.delete('/films', cookieJwtAuth, async (req, res) => {
  await Film.destroy({
    where: {
      name: {
        [Op.not]: null,
      },
    },
  }).then(() => {
    res.send('All films are deleted');
  });
});

app.get('/films', async (req, res) => {
  let name = req.query.stwith ?? '';
  let limit = parseInt(req.query.limit ?? 5);
  let page = parseInt(req.query.page ?? 1);

  if (page < 1) {
    page = 1;
  }

  let nextPage = null;

  let totalItems = await Film.count({
    where: {
      name: {
        [Op.startsWith]: name,
      },
    },
  });

  if (totalItems > page * limit) {
    nextPage = page + 1;
  }

  await Film.findAll({
    where: {
      name: {
        [Op.startsWith]: name,
      },
    },
    limit: limit,
    offset: (page - 1) * limit,
  }).then((result) => {
    res.json({
      data: result,
      previousPage: page === 1 ? null : page - 1,
      nextPage: nextPage,
      totalPages: Math.ceil(totalItems / limit),
    });
  });
});

app.listen(5100, () => {
  console.log('Server started on port 5100');
});
