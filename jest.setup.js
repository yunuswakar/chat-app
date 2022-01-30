const mongoose = require("mongoose");

const clearDB = async () => {
  Object.keys(mongoose.connection.collections).forEach(async (key) => {
    await mongoose.connection.collections[key].deleteMany({});
  });
};

beforeAll(async () => {
  clearDB();

  await mongoose.connect(
    "mongodb://localhost:27017/fambase",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        process.exit(1);
      }
      return clearDB();
    }
  );
});

afterEach(() => {
  clearDB();
});
