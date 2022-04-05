const express = require('express');
var cors = require('cors');
const connectDB = require('./db/index');
const adminRoutes = require('./routes/admin');
const sponsorsRoutes = require('./routes/sponsors');
const speakersRoutes = require('./routes/speakers');
const rsvpRoutes = require('./routes/rsvps');
const pagesRoutes = require('./routes/pages');
require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoutes);
app.use('/sponsors', sponsorsRoutes);
app.use('/speakers', speakersRoutes);
app.use('/rsvp', rsvpRoutes);
app.use('/pages', pagesRoutes);
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
connectDB();
