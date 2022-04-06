const express = require('express');
const auth = require('../middleware/auth');
const Joi = require('joi');
const { RSVP, Admin } = require('../db/Models');
const { convertJoiErrorToArray } = require('../utils/helpers');

const router = express.Router();

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
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
    const { name, email } = req.body;
    const existingRSVP = await RSVP.findOne({ email });
    if (existingRSVP) {
      res.status(403).send({
        status: 'failed',
        message: 'You already have a reservation',
      });
      return;
    }
    const newRsvp = new RSVP({
      name,
      email,
    });
    const rsvp = await newRsvp.save();
    res.status(200).send({
      status: 'success',
      message: 'RSVP reservation made',
      data: rsvp,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await Admin.findOne({ _id: req.user });
    if (user && user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only Super Admins are allowed to access RSVP data',
      });
      return;
    }
    const rsvps = await RSVP.find();
    res.status(200).send({
      status: 'success',
      message: 'RSVPs retrieved successfully',
      data: rsvps,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/confirm', auth, async (req, res) => {
  try {
    const { id, confirmed } = req.body;
    const user = await Admin.findOne({ _id: req.user });
    if (user && user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only Super Admins are allowed to change RSVP data',
      });
      return;
    }
    const rsvp = await RSVP.findOne({ _id: id, confirmed: confirmed });

    if (rsvp) {
      res.status(403).send({
        status: 'failed',
        message: 'Reservation already confirmed',
      });
      throw new Error('Reservation already confirmed');
    }
    await RSVP.findOneAndUpdate({ _id: id }, { confirmed: confirmed });
    const rsvps = await RSVP.find();
    res.status(200).send({
      status: 'success',
      data: rsvps,
      message: 'RSVP status updated successfully',
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete('/remove/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Admin.findOne({ id: req.user });
    if (user && user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only Super Admins can delete rsvps',
      });
    }
    const sponsor = await RSVP.findOneAndDelete({ _id: id });
    if (!sponsor) {
      res.status(401).send({
        status: 'failed',
        message: 'No such rsvps found',
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      message: 'RSVP removed successfully',
      data: sponsor,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
