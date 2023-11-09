const mongoose = require('mongoose');

module.exports = async () => {
  const MONGOURI = process.env.MONGOURI;
  console.log('url', MONGOURI);
  try {
    const connect = await mongoose.connect(MONGOURI);
    console.log(`Database connected to ${connect.connection.host}`);
  } catch (error) {
    console.error('Error while connecting to the database:');
    console.error(error);
  }
};
