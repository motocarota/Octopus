import { Env, Post } from "./types/Types";

function test(env: Env) {
  const { TELEGRAM_KEY, TELEGRAM_SECRET, TELEGRAM_CHAT_ID } = env

  if (!TELEGRAM_KEY || !TELEGRAM_SECRET || !TELEGRAM_CHAT_ID) {
    console.error('[telegram] missing config');
    return false;
  }
  return true;
}

async function send(env: Env, post: Post) {
  const { TELEGRAM_KEY, TELEGRAM_SECRET, TELEGRAM_CHAT_ID } = env;
  const {title, desc, imageUrl} = post
  const apiUrl = `https://api.telegram.org/bot${TELEGRAM_KEY}:${TELEGRAM_SECRET}/sendPhoto`;

  try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          photo: imageUrl,
          caption: `#${title} \n\n${desc}`,
          parse_mode: "Markdown"
        })
      });

      return response.json();
  } catch (err) {
      console.error("[telegram] error:", err);
      return err;
  }
}

export default {
  test,
  send,
}