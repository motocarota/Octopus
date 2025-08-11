import { Env, Post } from "./types/Types";

function test(env: Env) {
  const { TELEGRAM_KEY, TELEGRAM_SECRET, TELEGRAM_CHAT_ID } = env;

  if (!TELEGRAM_KEY || !TELEGRAM_SECRET || !TELEGRAM_CHAT_ID) {
    console.error("[telegram] missing config");
    return false;
  }
  return true;
}

async function send(env: Env, post: Post) {
  const { TELEGRAM_KEY, TELEGRAM_SECRET, TELEGRAM_CHAT_ID } = env;
  const { title, desc, imageUrl } = post;
  const apiUrl = `https://apia.telegram.org/bot${TELEGRAM_KEY}:${TELEGRAM_SECRET}/sendPhoto`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        photo: imageUrl,
        caption: `#${title} \n\n${desc}`,
        parse_mode: "Markdown",
      }),
    });

    return {
      success: true,
      data: response.json(),
    };
  } catch (err) {
    console.error("[telegram] error:", err);
    return {
      success: false,
      err,
    };
  }
}

export default {
  name: "Telegram",
  test,
  send,
};
