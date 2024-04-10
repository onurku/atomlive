export const appOrigin = process.env.APP_ORIGIN;

export const smtp = {
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD
};
