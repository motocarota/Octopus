import { Hono } from "hono";
import { env } from "hono/adapter";
import { Post } from "./types/Types";
import getChannel from "./middleware/getChannel.middleware";
import getAllChannels from "./middleware/getAllChannels.middleware";

const app = new Hono();
let post: Post = {
  title: "t",
  desc: "d",
  imageUrl: "i",
  tags: "t",
};

app.get("/", (c) => {
  return c.text(`Hello from octopus! here's the commands:
    - GET channel/list > view the list of all the services supported
    - GET channel/test/:id > check if the service is correctly setup
    - POST channel/send/:id > send the defined post to a specific channel
    - POST post > define a new post
    - GET post > get a json preview of the defined post
    - GET post/html > get a rough html preview of the defined post
    - POST all/test > test all the channels
    - POST all/send > send the defined post to all the channels
  `);
});

app.get("/channel/list", (c) => {
  // return the list of social media channel
  return c.text("Hello Hono!");
});

app.use("/channel/*/:id", getChannel);

app.get("/channel/test/:id", (c) => {
  const { test } = c.get("channel");
  const result = test(env(c));

  return c.json({ result });
});

app.get("/channel/send/:id", (c) => {
  const { send } = c.get("channel");
  const result = send(env(c), post);

  return c.json({ result });
});

app.get("/post", (c) => {
  return c.json({ post });
});

app.get("/post/html", (c) => {
  return c.html(`
    <div style="margin: auto; width: 300px;">
      <h1>${post.title}</h1>
      <img src="${post.imageUrl}" style="width: 300px; height: 250px" />
      <p>${post.desc}</p>
      <p>${post.tags}</p>
    </div>
  `);
});

app.post("/post", (c) => {
  const { title, imageUrl, desc, tags } = c.req.param() as Post;
  if (!title || !imageUrl) {
    return c.json({
      err: "missing required fields",
    });
  }
  post.title = title;
  post.imageUrl = imageUrl;
  post.desc = desc;
  post.tags = tags;

  return c.json({ post });
});

app.use("/all/*", getAllChannels);

app.get("/all/test", (c) => {
  const channels = c.get("channels");
  const result = {} as Record<string, boolean>;
  for (let channel of channels) {
    result[channel.name] = channel.ready ?? false;
  }

  return c.json(result);
});

app.post("/all/send", (c) => {
  const channels = c.get("channels");
  const result = {} as Record<string, object>;

  if (!post.title || !post.imageUrl) {
    return c.json({
      err: "post send all cancelled: missing data",
    });
  }

  for (let channel of channels) {
    if (!channel.ready) {
      result[channel.name] = {
        err: "channel skipped: marked as not ready",
      };
      continue;
    }
    // fugly but ok
    const postMd5 = post.title + post.imageUrl;
    if (!(channel.history ?? []).includes(postMd5)) {
      result[channel.name] = {
        err: "channel skipped: already sent this post",
      };
      continue;
    }
    result[channel.name] = channel.send(env(c), post);
    channel.history.push(postMd5);
  }

  return c.json(result);
});

export default app;
