const express = require('express');
const Joi = require('joi');
const { Speaker, Admin } = require('../db/Models/index');
const router = express.Router();
const auth = require('../middleware/auth');
const { convertJoiErrorToArray } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const speakers = await Speaker.find({ published: true });
    res.status(200).send({
      status: 'success',
      message: 'Sponsors retrieved successfully',
      data: speakers,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/add', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    company: Joi.string().min(1).required(),
    position: Joi.string().min(1).required(),
    avatar: Joi.string().uri().required(),
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
    const { name, company, position, avatar } = req.body;
    const user = await Admin.findOne({ id: req.user });
    if (user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only super admins add speaker',
      });
    }
    const existing_speaker = await Speaker.findOne({ name });
    if (existing_speaker) {
      res.status(403).send({
        status: 'failed',
        message: 'Speaker already exists in our records',
      });
      return;
    }
    const speaker = new Speaker({
      name,
      company,
      avatar,
      position,
    });
    const createdSpeaker = await speaker.save();
    res.status(200).send({
      status: 'success',
      message: 'Sponsor addedd successfully',
      data: createdSpeaker,
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
        message: 'Only Super Admins can delete sponsors',
      });
    }
    const speaker = await Speaker.findOneAndDelete({ _id: id });
    if (!speaker) {
      res.status(401).send({
        status: 'failed',
        message: 'No such speakers found',
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      message: 'Speaker removed successfully',
      data: speaker,
    });
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
