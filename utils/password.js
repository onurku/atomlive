import { genSalt, hash as _hash, compare } from "bcrypt";
const saltRounds = 10;

const encryptPassword = function (password) {
  return new Promise(function (resolve, reject) {
    genSalt(saltRounds, function (err, salt) {
      if (err) {
        return reject(err);
      }
      _hash(password, salt, function (err, hash) {
        if (err) {
          return reject(err);
        } else {
          return resolve(hash);
        }
      });
    });
  });
};

const matchPassword = function (password, hash) {
  console.log("matchpass call");
  return new Promise(function (resolve, reject) {
    compare(password, hash, function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

export { encryptPassword, matchPassword };
