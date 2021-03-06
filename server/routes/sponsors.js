const express = require('express');
const Joi = require('joi');
const { Sponsor, Admin } = require('../db/Models/index');
const router = express.Router();
const auth = require('../middleware/auth');
const { convertJoiErrorToArray } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find();
    res.status(200).send({
      status: 'success',
      message: 'Sponsors retrieved successfully',
      data: sponsors,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/add', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    website: Joi.string().uri().required(),
    icon: Joi.string().uri().required(),
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
    const { name, website, icon } = req.body;
    const user = await Admin.findOne({ id: req.user });
    if (user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only super admins add sponsors',
      });
    }
    const existing_sponsor = await Sponsor.findOne({ name });
    if (existing_sponsor) {
      res.status(403).send({
        status: 'failed',
        message: 'Sponsor already exists in our records',
      });
      return;
    }
    const sponsor = new Sponsor({
      name,
      website,
      icon,
      added_by: user.username,
    });
    const createdSponsor = await sponsor.save();
    res.status(200).send({
      status: 'success',
      message: 'Sponsor addedd successfully',
      data: createdSponsor,
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
    const sponsor = await Sponsor.findOneAndDelete({ _id: id });
    if (!sponsor) {
      res.status(401).send({
        status: 'failed',
        message: 'No such sponsors found',
      });
      return;
    }
    res.status(200).send({
      status: 'success',
      message: 'Sponsor removed successfully',
      data: sponsor,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/edit', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1),
    website: Joi.string().min(1),
    icon: Joi.string().uri(),
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
    const sponsor = await Sponsor.findOne({ _id: id });

    if (!sponsor) {
      res.status(401).send({
        status: 'failed',
        message: 'No such sponsors found',
      });
      return;
    }
    const { name, website, icon } = req.body;
    if (!name && !website && !icon) {
      res.status(401).send({
        status: 'failed',
        message: 'No data to update',
      });

      return;
    }
    const update = {};
    if (name) update.name = name;
    if (website) update.website = website;
    if (icon) update.icon = icon;
    await Sponsor.findOneAndUpdate({ _id: id }, update);

    const updatedSponsor = await Sponsor.findOne({ _id: id });
    res.status(200).send({
      status: 'success',
      message: 'Sponsor updated successfully',
      data: updatedSponsor,
    });
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
