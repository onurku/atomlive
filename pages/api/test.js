import { sendMailWithSendGrid } from "@/utils/send-email";

const test = async (req, res) => {
    await sendMailWithSendGrid("account_verify", {
        email: "abhishekr700@gmail.com"
    })
    return res.json("Testing")
};

export default function handler(req, res) {
    test(req, res)
}