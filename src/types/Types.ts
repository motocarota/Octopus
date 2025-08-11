declare module 'hono' {
  interface ContextVariableMap {
    channel: Channel
  }
}

export type Env = Record<string, string>

export type Post = {
  title: string,
  desc?: string,
  imageUrl: string,
  tags?: string,
}

export type Channel = {
  test: (e: Env) => boolean;
  send: (e: Env, post: Post) => Promise<any>;
}