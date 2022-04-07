const express = require('express');
const { Page } = require('../db/Models/index');
const router = express.Router();

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

module.exports = router;
