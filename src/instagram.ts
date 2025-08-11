import { Env, Post } from "./types/Types";

function test(env: Env) {
  return false;
}

async function send(env: Env, post: Post) {
  return Promise.reject('NYI')
}

export default {
  name: 'Instagram',
  test,
  send,
}