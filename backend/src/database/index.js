import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnection = mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true, 
      useFindAndModify: true ,
      useUnifiedTopology: true
    });
  }

}

export default new Database();