const express = require('express');
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin } = require('../db/Models/index');
const { convertJoiErrorToArray } = require('../utils/helpers');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    status: 'OK',
    message: 'Admin routes working successfully',
  });
});

router.post('/create', async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    full_name: Joi.string().min(3).required(),
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
        ),
      )
      .required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
  });

  try {
    //validate user data
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const errorMessage = {
      status: 'failed',
      error: convertJoiErrorToArray(err.message),
    };
    res.status(400).json(errorMessage);
    return;
  }
  try {
    const { username, full_name, email, password } = req.body;
    const user = await Admin.findOne({ username });
    if (user) {
      res.status(400).json({
        status: 'OK',
        message: 'User already exist',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      full_name,
      username,
      email,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();
    const userPayload = {
      email: createdUser.email,
      id: createdUser.id,
    };
    const token = JWT.sign(userPayload, process.env.JWT_SECRET);
    console.log(user);
    res.status(200).send({
      status: 'OK',
      ...createdUser._doc,
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().required(),
  });

  try {
    //validate user data
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const errorMessage = {
      status: 'failed',
      error: convertJoiErrorToArray(err.message),
    };
    res.status(400).json(errorMessage);
    return;
  }

  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
      res.status(404).send({
        status: 'failed',
        message: 'User not found or does not exist',
      });
    }
    const equalPassword = await bcrypt.compare(password, user.password);
    if (!equalPassword) {
      res.status(401).send({
        status: 'failed',
        message: 'Invalid Credentials',
      });
    }
    const userPayload = {
      email: user.email,
      id: user.id,
    };
    const token = JWT.sign(userPayload, process.env.JWT_SECRET);
    const clientUser = await Admin.findOne({ id: user.id }).select(
      '-password -__v',
    );
    const response = {
      ...clientUser._doc,
      token,
    };

    res.status(200).send({
      status: 'success',
      message: 'User logged in successfully',
      data: response,
    });
  } catch (error) {}
});

router.get('/auth', auth, async (req, res) => {
  try {
    const user = await Admin.findOne({ id: req.user }).select('-password -__v');
    if (!user) {
      res.status(404).send({
        status: 'failed',
        message: 'User with token does not exist in our records',
      });
    }
    res.status(200).send({
      status: 'success',
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
