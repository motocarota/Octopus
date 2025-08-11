import { createMiddleware } from 'hono/factory'
import channels from '../channels';
import { env } from 'hono/adapter';

const getAllChannels = createMiddleware(async (c, next) => {
  const result = Object.values(channels).map(
    channel => ({
      ...channel,
      ready: channel.test(env(c))
    })
  ) 
  
  c.set('channels', result)
  await next();
})
export default getAllChannels