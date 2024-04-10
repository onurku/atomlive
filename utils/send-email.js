import nodemailer from "nodemailer";
import * as sgMail from "@sendgrid/mail";

import * as templates from "@/pages/api/email/email-templates";
import { smtp } from "@/utils/config";

sgMail.setApiKey(process.env.SMTP_PASSWORD);

const { service, host, port, secure, username, password } = smtp;

export function sendEmail({ sender, receivers, subject, text, html }) {
  return new Promise((resolve) => {
    let transpObj = {
      auth: { user: username, pass: password },
      tls: { rejectUnauthorized: false }
    };
    if (service === "gmail") {
      transpObj = { service, ...transpObj };
    } else {
      transpObj = { host, port, secure: !!(secure * 1), ...transpObj };
    }

    const transporter = nodemailer.createTransport(transpObj);

    if (!sender) {
      sender = `Lienne at Atom <atom@atom.live>`;
    }

    const to = receivers.join(", ");
    transporter
      .sendMail({ from: sender, to, subject, text, html })
      .then(() => resolve(true))
      .catch((err) => {
        console.error("Error sending message", err);
        resolve(false);
      });
  });
}

export async function sendMailWithSendGrid(templateName, values) {
  console.log(templates);

  const template = templates[templateName];
  const dynamicValues = template.data;
  let html = await template.templates.html;
  let text = await template.templates.txt;
  console.log("SendMailSGxxx:", values);

  for (let [key, tempKey] of Object.entries(dynamicValues)) {
    console.log("search - ", key);
    if (values[key]) {
      html = html.replace(tempKey, values[key]);
      text = text.replace(tempKey, values[key]);
    }
  }

  const msg = {
    to: values.email,
    from: process.env.SENDGRID_EMAIL,
    subject: template.subject,
    html: html,
    text: text 
  };

  try {
    await sgMail.send(msg)
  } catch (err) {
    console.log(err);
    Promise.reject("Email Failed");
  }

  // TODO: Add checks for file existence
  // TODO: Add check for overrides must contain email
};