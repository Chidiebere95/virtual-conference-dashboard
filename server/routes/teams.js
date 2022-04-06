const express = require('express');
const Joi = require('joi');
const { Team, Admin } = require('../db/Models/index');
const router = express.Router();
const auth = require('../middleware/auth');
const { convertJoiErrorToArray } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).send({
      status: 'success',
      message: 'Teams retrieved successfully',
      data: teams,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/add', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    role: Joi.string(),
    avatar: Joi.string().uri(),
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
    const { name, role, avatar } = req.body;
    const user = await Admin.findOne({ id: req.user });
    if (user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only super admins add sponsors',
      });
    }
    const existing_team = await Team.findOne({ name });
    if (existing_team) {
      res.status(403).send({
        status: 'failed',
        message: 'Team already exists in our records',
      });
      return;
    }
    const team = new Team({
      name,
      role,
      avatar,
    });
    const createdTeam = await team.save();
    res.status(200).send({
      status: 'success',
      message: 'Sponsor addedd successfully',
      data: createdTeam,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/remove', auth, async (req, res) => {
  const { id } = req.query;
  try {
    const user = await Admin.findOne({ id: req.user });
    if (user && user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only Super Admins can delete teams',
      });
    }
    const team = await Team.findOneAndDelete({ _id: id });
    if (!team) {
      res.status(401).send({
        status: 'failed',
        message: 'No such teams found',
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      message: 'Sponsor removed successfully',
      data: team,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/edit', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1),
    role: Joi.string().min(1),
    avatar: Joi.string().uri(),
  });
  const { id } = req.query;
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
    const team = await Team.findOne({ _id: id });

    if (!team) {
      res.status(401).send({
        status: 'failed',
        message: 'No such teams found',
      });
      return;
    }
    const { name, role, avatar } = req.body;
    if (!name && !role && !avatar) {
      res.status(401).send({
        status: 'failed',
        message: 'No data to update',
      });

      return;
    }
    const update = {};
    if (name) update.name = name;
    if (role) update.role = role;
    if (avatar) update.avatar = avatar;
    await Team.findOneAndUpdate({ _id: id }, update);

    const updatedTeam = await Team.findOne({ _id: id });
    res.status(200).send({
      status: 'success',
      message: 'Team updated successfully',
      data: updatedTeam,
    });
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
