import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { Post } from './types/Types';
import getChannel from './middleware/getChannel.middleware';

const app = new Hono()
let post: Post = {
  title: "t",
  desc: 'd',
  imageUrl: 'i',
  tags: 't',
}

app.get('/', (c) => {
  return c.text(`Hello from octopus! here's the commands:
    - GET channel/list > view the list of all the services supported
    - GET channel/test/:id > check if the service is correctly setup
    - POST channel/send/:id > send the defined post to a specific channel
    - POST post > define a new post
    - GET post > get a preview of the defined post
    - POST send > send the defined post
  `);
})

app.get('/channel/list', (c) => {
  // return the list of social media channel
  return c.text('Hello Hono!')
})

app.use('/channel/*/:id', getChannel);

app.get('/channel/test/:id', (c) => {
  const { test } = c.get('channel')
  const result = test(env(c))

  return c.json({ result })
})

app.get('/channel/send/:id', c => {
  const { send } = c.get('channel')
  const result = send(env(c), post)

  return c.json({ result })
})

app.get('/post/new', c => {
  // TODO return currently set title, desc, tags and imageUrl
  return c.text("NYI!")
})

app.post('/post/new', c => {
  // TODO check if title, desc, tags and imageUrl are set
  // TODO pass title, desc, tags and imageUrl
  return c.text("NYI!")
})

app.post('/post/send', c => {
  // TODO for each registered social run test and send
  return c.text("NYI!")
})


export default app
