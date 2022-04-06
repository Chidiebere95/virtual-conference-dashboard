const express = require('express');
const Joi = require('joi');
const { Event, Sponsor, Route, Admin } = require('../db/Models/index');
const router = express.Router();
const auth = require('../middleware/auth');
const { convertJoiErrorToArray } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send({
      status: 'success',
      message: 'Events retrieved successfully',
      data: events,
    });
  } catch (err) {
    console.error(err.message);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    res.status(200).send({
      status: 'success',
      message: 'Event retrieved successfully',
      data: event,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/add', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    start: Joi.date().required(),
    end: Joi.date().min(1).required(),
    start_time: Joi.string().required(),
    end_time: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri(),
    location: Joi.string(),
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
    const {
      name,
      start,
      end,
      start_time,
      end_time,
      description,
      image,
      location,
    } = req.body;

    const user = await Admin.findOne({ _id: req.user });
    if (user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only super admins add Page',
      });
    }
    const existing_event = await Event.findOne({ name });
    if (existing_event) {
      res.status(403).send({
        status: 'failed',
        message: 'Event already exists in our records',
      });
      return;
    }

    const event = new Event({
      name,
      start,
      end,
      start_time,
      end_time,
      description,
      image,
      location,
    });
    const createdEvent = await event.save();
    res.status(200).send({
      status: 'success',
      message: 'Page addedd successfully',
      data: createdEvent,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/remove/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Admin.findOne({ id: req.user });
    if (user && user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only Super Admins can delete events',
      });
    }
    const event = await Event.findOneAndDelete({ _id: id });

    if (!event) {
      res.status(401).send({
        status: 'failed',
        message: 'No such Events found',
      });
      return;
    }

    res.status(200).send({
      status: 'success',
      message: 'Event removed successfully',
      data: event,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/edit', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1),
    start: Joi.date(),
    end: Joi.date(),
    start_time: Joi.string(),
    end_time: Joi.string(),
    description: Joi.string().min(1),
    image: Joi.string().uri(),
    location: Joi.string().min(1),
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
    const event = await Event.findOne({ _id: id });

    if (!event) {
      res.status(401).send({
        status: 'failed',
        message: 'No such Events found',
      });
      return;
    }

    const {
      name,
      start,
      end,
      start_time,
      end_time,
      description,
      image,
      location,
    } = req.body;
    if (!name && !start && !end && !description && !image && !location) {
      res.status(403).send({
        status: 'failed',
        message: 'No data to update',
      });

      return;
    }
    const update = {};
    if (name) update.name = name;
    if (start) update.start = start;
    if (end) update.end = end;
    if (start_time) update.start_time = start_time;
    if (end_time) update.end_time = end_time;
    if (description) update.description = description;
    if (image) update.image = image;
    if (location) update.location = location;
    await Event.findOneAndUpdate({ _id: id }, update);

    // TODO: Return all events for easy state update on frontend
    const updatedEvent = await Event.findOne({ _id: id });
    res.status(200).send({
      status: 'success',
      message: 'Page updated successfully',
      data: updatedEvent,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
