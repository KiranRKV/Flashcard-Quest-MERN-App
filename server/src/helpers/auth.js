// server/src/helpers/auth.js

import bcrypt from "bcrypt";

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
};

export { hashPassword, comparePassword };
