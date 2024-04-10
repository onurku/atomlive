import { sendMailWithSendGrid } from "@/utils/send-email";
import formatResponse from "@/utils/api-hooks/useResponse";
import * as templates from "@/pages/api/email/email-templates";
import { User } from "@/lib/database/connection";

const sendEmail = async (req, res) => {
  let { template_name, user_id, type } = req.body;

  const { badJson, goodJson } = await formatResponse(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return badJson("Method Not Allowed", 405);
  }

  const notReceived = [];
  if (!template_name) {
    notReceived.push("Template");
  }
  if (!user_id) {
    notReceived.push("User Id");
  }
  if (notReceived.length > 0) {
    return badJson(
      `${notReceived.join(", ")} invalid. Check what you just entered.`
    );
  }

  let templateList = Object.keys(templates);
  console.log(templateList);

  if (!templateList.includes(template_name)) {
    return badJson("Invalid Template Name");
  }
  try {
    // Check exisitng user
    let user = await User.findOne({
      where: { id: user_id }
    });
    if (!user || !user.dataValues) {
      return badJson("User info not available");
    }

    await sendMailWithSendGrid(template_name, user.dataValues, type);
    return goodJson("Email Sent");
  } catch (error) {
    console.log("error is - ", error);
    if (error) {
      return badJson(error);
    }
  }
};

export default sendEmail;
