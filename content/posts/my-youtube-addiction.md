---
title: "My Youtube Addiction"
date: 2019-04-06T08:09:42+03:00
draft: true
categories: ["writings"]
---


```
Hi everyone, ever since YouTube changed their recommendation engine from the subscription feed to a personalized recommendation feed, I find myself spending hours of my day (unwillingly!) on YouTube.

I noticed I really got addicted and I don't like it.

So I downloaded all of my 'watch' data from YouTube and I'm trying to research how they were able to program my mind.

The data I have is a timeline of every video I've watched in the past 2.5 years. It includes the hour of the day I played the video, the duration of the video and other metadata about the video/channel etc.

I wanted to get your recommendation on what interesting correlations I can find in the data?

I thought of simple questions such as: Which channels I watch the most? which tags/topics/key words in title I watch the most? What is the average time I spend a day on YouTube? How much of it is continuous?

ps. If anyone would like to panther on this research please reach out. My name is Elad and my last name is Gariany. My email is my first@last.com
```



## Your Youtube Addiction

I stopped watching TV. Well, at least I thought so. Like most of my age group I grew up infront of the infinamus screen. Whatever was on, I was on it. And I was not alone - according to... 90% of OECD kids are addicted to the screen.

How much kids are watching Twitch, YouTube Streams.

There are countless evidence to how bad it is for you blablabla.

But like a true addict I thought: "phhh. Addiction? I can stop whenever I want", but I was wrong. Changing old paterns are is really difficult. More about changing paterns...

According to something, you are addict if you're "investing" 50% of your time in your addiction.

So. I thought, lets check it out and I looked into my Google Takeout YouTube files and I was shocked.

Bellow, I present to you, my addiction:


```
index, products, date, channel_name, video_title, channel_url, video_url
```

```html
<div class="outer-cell">
  <div class="mdl-grid"><div class="header-cell">
    <p class="mdl-typography--title">YouTube<br></p>
  </div>
  <div class="content-cell">
  Watched&nbsp;
    <a href="https://www.youtube.com/watch?v=MzGVIbtBeSo">STOP BEING SO DISTRACTED</a>
    <br>
    <a href="https://www.youtube.com/channel/UCxF-6VQbH6J_7KE7jvhFenw">Darius Foroux</a>
    <br>
    Mar 14, 2019, 6:39:42 AM UTC
  </div>
  <div class="content-cell">
  </div>
    <div class="content-cell">
      <b>Products:</b><br> YouTube<br>
    </div>
  </div>
</div>
```

But wait, there is more! Are you addicted? lets analyze your `watch_history.html` file and see. I open source it here: