import { createMiddleware } from 'hono/factory'
import channels from '../channels';

const getChannel = createMiddleware(async (c, next) => {
  const id = c.req.param('id') ?? ""
  const channel = channels[id];
  if (!channel) {
    return c.json({ err: `no account found for ${id}` })
  }
  c.set('channel', channel)
  await next();
})
export default getChannel