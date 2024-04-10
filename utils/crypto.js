const crypto = require("crypto");

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encrypt = (text, algorithm = "aes-256-cbc") => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const randomChars = (str, len) => {
  const strLen = str.length;
  if (len > strLen) len = strLen;

  const selectedIndices = [];
  const chosenChars = [];

  for (let i = 0; i < len; i++) {
    let iter = 0,
      randInd,
      newChar;

    do {
      randInd = Math.floor(Math.random() * 10);
      iter++;
    } while (selectedIndices.includes(randInd) && iter > 10);
    selectedIndices.push(randInd);

    iter = 0;
    do {
      newChar = str.charAt(randInd);
      iter++;
    } while (chosenChars.includes(newChar) && iter > 10);

    chosenChars.push(newChar);
  }

  return chosenChars.join("");
};
