const express = require('express');
const Joi = require('joi');
const { Page, Route, Admin } = require('../db/Models/index');
const router = express.Router();
const auth = require('../middleware/auth');
const { convertJoiErrorToArray } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).send({
      status: 'success',
      message: 'Pages retrieved successfully',
      data: pages,
    });
  } catch (err) {
    console.error(err.message);
  }
});
// router.get('/id/:id', async (req, res) => {
//   try {
//     const pages = await Page.findOne({ _id: req.params.id });
//     res.status(200).send({
//       status: 'success',
//       message: 'Pages retrieved successfully',
//       data: pages,
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });
router.get('/:path', async (req, res) => {
  try {
    const { path } = req.params;
    const pages = await Page.findOne({ path: `/${path}` });
    res.status(200).send({
      status: 'success',
      message: 'Pages retrieved successfully',
      data: pages,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/add', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    path: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
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
    const { name, path, content } = req.body;

    const user = await Admin.findOne({ _id: req.user });
    if (user.admin_level < 1) {
      res.status(401).send({
        status: 'failed',
        message: 'Only super admins add Page',
      });
    }
    const existing_page = await Page.findOne({ name });
    if (existing_page) {
      res.status(403).send({
        status: 'failed',
        message: 'Page already exists in our records',
      });
      return;
    }
    const existing_route = await Route.findOne({ path });
    if (existing_route) {
      res.status(403).send({
        status: 'failed',
        message: 'Route already exists in our records',
      });
      return;
    }
    const route = new Route({
      name,
      path,
      route: `/pages${path}`,
    });
    await route.save();
    const page = new Page({
      name,
      path,
      content,
      created_by: user._id,
    });
    const createdPage = await page.save();
    res.status(200).send({
      status: 'success',
      message: 'Page addedd successfully',
      data: createdPage,
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
        message: 'Only Super Admins can delete pages',
      });
    }
    const page = await Page.findOneAndDelete({ _id: id });

    if (!page) {
      res.status(401).send({
        status: 'failed',
        message: 'No such Pages found',
      });
      return;
    }
    const route = await Route.findOneAndDelete({ name: page.name });
    if (!route) {
      res.status(403).send({
        status: 'failed',
        message: 'No such Route found',
      });
      return;
    }

    res.status(200).send({
      status: 'success',
      message: 'Page removed successfully',
      data: page,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/edit', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1),
    path: Joi.string().min(1),
    content: Joi.any(),
    thumbnail: Joi.string().uri(),
  });
  const { id } = req.query;
  try {
    console.log(id);
    //validate user data
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const errorMessage = {
      status: 'failed',
      error: convertJoiErrorToArray(err.message),
    };
    console.log(errorMessage);
    res.status(400).json(errorMessage);
    return;
  }
  try {
    const page = await Page.findOne({ _id: id });

    if (!page) {
      res.status(401).send({
        status: 'failed',
        message: 'No such Pages found',
      });
      return;
    }
    const route = await Route.findOne({ name: page.name });
    if (!route) {
      res.status(403).send({
        status: 'failed',
        message: 'No such Route found',
      });
      return;
    }
    const { name, path, content, thumbnail } = req.body;
    if (!name && !path && !content && !thumbnail) {
      res.status(401).send({
        status: 'failed',
        message: 'No data to update',
      });

      return;
    }
    const update = {};
    if (name) update.name = name;
    if (path) update.path = path;
    if (content) update.content = content;
    if (thumbnail) update.thumbnail = thumbnail;
    console.log(update.name);
    await Page.findOneAndUpdate({ _id: id }, update);
    await Route.findOneAndUpdate(
      { name: page.name },
      { path, route: `/pages${path}`, name },
    );
    const updatedPage = await Page.findOne({ _id: id });
    res.status(200).send({
      status: 'success',
      message: 'Page updated successfully',
      data: updatedPage,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
