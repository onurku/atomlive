import { encrypt, randomChars } from "@/utils/crypto";

function getRandomCode() {
  const { encryptedData } = encrypt(new Date().toISOString());
  const code = randomChars(encryptedData, 8);
  return code;
}

async function getVerificationLink(uuid) {
  const code = getRandomCode();
  const verificationLink = `${process.env.NEXT_PUBLIC_VERCEL_URL}account/verify?code=${code}&uuid=${uuid}`;
  return {
    verificationLink,
    code
  };
}

async function getResetPasswordLink(uuid) {
  const code = getRandomCode();
  const resetPassLink = `${process.env.NEXT_PUBLIC_VERCEL_URL}account/reset-password/?code=${code}&uuid=${uuid}`;
  return {
    resetPassLink: resetPassLink,
    code
  };
}

export { getVerificationLink, getResetPasswordLink };
