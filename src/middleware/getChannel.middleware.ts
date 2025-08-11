import { createMiddleware } from 'hono/factory'
import accounts from '../accounts';

const getChannel = createMiddleware(async (c, next) => {
  const id = c.req.param('id') ?? ""
  const channel = accounts[id];
  if (!channel) {
    return c.json({ err: `no account found for ${id}` })
  }
  c.set('channel', channel)
  await next();
})
export default getChannel