const express = require('express');
const connectDB = require('./db/index');
const adminRoutes = require('./routes/admin');
const sponsorsRoutes = require('./routes/sponsors');
const speakersRoutes = require('./routes/speakers');
const rsvpRoutes = require('./routes/rsvps');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoutes);
app.use('/sponsors', sponsorsRoutes);
app.use('/speakers', speakersRoutes);
app.use('/rsvp', rsvpRoutes);
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
connectDB();
