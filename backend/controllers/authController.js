import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/auth.config.js';
import User from '../models/user.js';
import Profile from '../models/profile.js';

export const register = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    await Profile.create({
      user: user._id,
      backgroundColor: 'Green',
      ButtonColor: 'Green',
      Logo: 'test logo',
      Headline: 'This is my linktree account',
    });

    res.status(201).json({ message: 'Successfully created account' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: 'User not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        expiresIn: 86400,
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
//