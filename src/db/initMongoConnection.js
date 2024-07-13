import mongoose from 'mongoose';

async function initMongoConnection() {
  const DB_URI = `mongodb+srv://student101:my_password@cluster0.n2sxbka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { initMongoConnection };
