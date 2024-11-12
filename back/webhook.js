// webhook.js

async function sendDiscordBook(book) {
  const fetch = (await import("node-fetch")).default;

  const discordWebhookUrl =
    "https://discord.com/api/webhooks/1305756039836340275/f4yCFP5f2ILFUsgDnNVdzTsmZ8udI7_fpuyM_De0-y0KEsstP6Zlz4YwGilcAHKQ0wSX";

  const discordMessage = {
    content: `New book added: **${book.title}** by **${book.author}**. (ID: ${book.id})`,
  };

  fetch(discordWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discordMessage),
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Error sending message to Discord:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error sending message to Discord:", error);
    });
}

module.exports = sendDiscordBook;
