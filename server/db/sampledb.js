var User = require('../models/user');
var Event = require('../models/event');
var Security = require('../security');

module.exports = function () {

  var salt, hash;
  salt = Security.createSalt();
  hash = Security.hashPwd(salt, 'qwerty');

  var user1 = User({
    name: 'Piotr Jakubowski',
    username: 'admin',
    email: 'lotropj@gmail.com',
    password: hash,
    age: 22,
    roles: ['admin'],
    location: 'Poznan',
    bio: 'Student Politechniki Poznanskiej, tworca pracy',
    car: 'Ford Focus',
    tel: '777888999',
    salt: salt
  });

  var salt1 = Security.createSalt();
  var hash1 = Security.hashPwd(salt1, 'michalak');

  var user2 = User({
    name: 'Mateusz Michalak',
    username: 'michalak',
    email: 'abc@xyz.com',
    password: hash1,
    age: 21,
    roles: [],
    location: 'Poznan',
    bio: 'Jestem Mateusz',
    car: 'Audi',
    tel: '010202304',
    salt: salt1
  });

  var salt2 = Security.createSalt();
  var hash2 = Security.hashPwd(salt2, 'smogur');

  var user3 = User({
    name: 'Adrian Smogur',
    username: 'smogur',
    email: 'abc@qwe.com',
    password: hash2,
    age: 23,
    roles: [],
    location: 'Poznan',
    bio: 'Adi',
    tel: '040323555',
    salt: salt2
  });

  var salt3 = Security.createSalt();
  var hash3 = Security.hashPwd(salt3, 'kowalski');

  var user4 = User({
    name: 'Tomasz Kowalski',
    username: 'kowalski',
    email: 'abc@cvb.com',
    password: hash3,
    age: 18,
    roles: [],
    location: 'Warszawa',
    bio: 'Tomcio Tom',
    car: 'BMW',
    tel: '343767888',
    salt: salt3
  });

  var salt4 = Security.createSalt();
  var hash4 = Security.hashPwd(salt4, 'piszczek');

  var user5 = User({
    name: 'Michal Piszczek',
    username: 'piszczek',
    email: 'abc@iop.com',
    password: hash4,
    age: 20,
    location: 'Czerwonak',
    bio: 'Piszczu',
    car: 'Toyota',
    tel: '123456789',
    salt: salt4
  });

  user1.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano uzytkownika");
  });

  user2.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano uzytkownika");
  });

  user3.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano uzytkownika");
  });

  user4.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano uzytkownika");
  });

  user5.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano uzytkownika");
  });

  var event1 = Event({
    name: 'Tame Impala',
    date: new Date('2016-06-29'),
    desc: 'Tame Impala na Opener Festival',
    location: 'Gdynia'
  });

  var event2 = Event({
    name: 'Radiohead',
    date: new Date('2016-06-08'),
    desc: 'Radiohead na festiwalu Primavera Sound',
    location: 'Barcelona'
  });

  var event3 = Event({
    name: 'Brian Wilson',
    date: new Date('2016-03-28'),
    desc: 'Koncert Briana Wilsona',
    location: 'Auckland'
  });
  var event4 = Event({
    name: 'Father John Misty',
    date: new Date('2016-05-25'),
    desc: 'koncert Father John Misty. PBHFCLUB',
    location: 'Berlin'
  });
  var event5 = Event({
    name: 'Beach House',
    date: new Date('2016-02-10'),
    desc: 'koncert Beach House',
    location: 'Melbourne'
  });

  event1.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano wydarzenie");
  });
  event2.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano wydarzenie");
  });
  event3.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano wydarzenie");
  });
  event4.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano wydarzenie");
  });
  event5.save(function (err) {
    if (err) throw err;

    console.log("Pomyslnie zapisano wydarzenie");
  });

};