require("dotenv").config();
const twilio = require("twilio");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const fromPhoneNumber = process.env.TWILIO_NUMBER;
const sendMessages = process.env.SEND_MESSAGES === "true";

if (!sendMessages)
  console.log(
    "Sending messages is disabled. Please add env variabled SEND_MESSAGES=true"
  );

module.exports = async function sendMessage(from, to, groupName) {
  if (!from) throw new Error("Missing 'from' gifter!");
  if (!to) throw new Error(`Missing 'to' giftee for gifter ${from.firstName}!`);

  const messageBody = `Hello ${
    from.firstName
  }, you are giving a gift to ${fullName(to)} for ${groupName}.`;

  if (sendMessages) {
    console.log(
      `Sending message to gifter ${from.firstName} (${from.phoneNumber})`
    );
    return client.messages.create({
      from: fromPhoneNumber,
      to: from.phoneNumber,
      body: messageBody
    });
  } else {
    console.log(
      `Would send message "${messageBody}" to gifter ${from.firstName} (${
        from.phoneNumber
      })`
    );
    return { success: true };
  }
};

function fullName(gifter) {
  return `${gifter.firstName} ${gifter.lastName}`;
}
