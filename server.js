const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeappdatabase', {
  useMongoClient: true
});

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

userSchema.methods.manify = function (next) {
  this.name = this.name + '-boy';

  return next(null, this.name);
};

userSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

const User = mongoose.model('User', userSchema);
//instancje klasy User
const kenny = new User({
  name: 'Kenny',
  username: 'Kenny_the_boy',
  password: 'password'
});
// TEMPLATE END

kenny.manify(function (err, name) {
  if (err) throw err;
  console.log('Twoje nowe imię to: ' + name);
});

kenny.save(function (err) {
  if (err) throw err;

  console.log('Uzytkownik ' + kenny.name + ' zapisany pomyslnie');
});

const benny = new User({
  name: 'Benny',
  username: 'Benny_the_boy',
  password: 'password'
});

benny.manify(function (err, name) {
  if (err) throw err;
  console.log('Twoje nowe imię to: ' + name);
});

benny.save(function (err) {
  if (err) throw err;

  console.log('Uzytkownik ' + benny.name + ' zapisany pomyslnie');
});

const mark = new User({
  name: 'Mark',
  username: 'Mark_the_boy',
  password: 'password'
});

mark.manify(function (err, name) {
  if (err) throw err;
  console.log('Twoje nowe imię to: ' + name);
});

mark.save(function (err) {
  if (err) throw err;

  console.log('Uzytkownik ' + mark.name + ' zapisany pomyslnie');
});