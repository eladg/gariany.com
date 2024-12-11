---
title: "FFmpeg: Step-by-Step Retro Video Filter"
date: 2020-08-19T15:59:02-07:00
categories: ["code"]
tags: ["ffmpeg", "gist", "video-tech"]
discussionId: "ffmpeg-retro-video-filter"
image: "poster.jpg"
---

## FFmpeg: Step-by-Step Retro Video Filter

I miss working with FFmpeg, so when I came across this [interesting challenge on Reddit]((https://www.reddit.com/r/ffmpeg/comments/ibf0or/how_would_you_recreate_this_effect_with_ffmpeg/)), I could not say no. I am currently looking for a new project as an Audio/Video software engineer or project manager and it was a nice break away from interviews. Are you currently hiring or have any interesting project proposals? [Get in touch with me!](/contact) 🌻


So, the challenge is to create a retro video filter using FFmpeg only for a given video. Here is my results:

{{< video src="result.mp4" autoplay="true" loop="true" >}}
#### See Full FFmpeg Code bellow

Wofff... There is a lot to unpack here, but let's start with the assets. I remember seeing this amazing AI regenerative work recently done by [Denis Shiryaev](https://www.youtube.com/channel/UCD8J_xbbBuGobmw_N5ga3MA) [San Francisco, a Trip down Market Street, April 14, 1906](https://www.youtube.com/watch?v=VO_1AdYRGW8) based on the [original video](https://youtu.be/1Zmhr3ubG2E?t=194). Shout out to Denis, your work is remarkable!

I thought it will be fun to re-retro it. Also, it helps to compare with the original 1906 footage.

### Step 1: Masking the Video:

We start by creating a square to mask the video input to get that old round rectangle video feeling. I use [ImageMagick](https://imagemagick.org/index.php) to compose the shape. I probably could have created this shape using an FFmpeg filter, but I was lazy and thought it will be useful to have a method to generally mask any video with any shape, even if this shape is a video file!

We start by creating the Round Rectangle we going to use to mask the video:

```bash
# generate square.png mask file
convert -size 1000x1000 xc:transparent -fill green -stroke green -draw "roundrectangle 0,0 1000,1000, 100,100" square.png
```

Result:

{{< figure src="square250x250.png">}}


### Chromakey green-screen FFmpeg Masking

{{< video src="masked_video.mp4" autoplay="true" loop="true" >}}

```bash
# mask input.mp4 with square.png input mask

ffmpeg -y -f rawvideo -pix_fmt rgb32 -s 1920x1080 -i /dev/zero -r 30 -filter_complex "movie='square.png'[sqr];[0:][sqr]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2[canvas];[canvas]chromakey=0x008000:blend=0:similarity=0.15[canvas2];[0:][canvas2]overlay[canvas3];movie='input.mp4',scale=1920:1080[i1];[0:][i1]overlay[i2];[i2][canvas3]overlay[mix1];[0:][mix1]overlay[o]" -map "[o]" -c:v libx264 -crf 31 -frames:v 300 masked_video.mp4
```

We start with an empty 1920x1080 canvas of pixels, setting "/dev/zero" as our data stream and RGB32 as our pixel format. I use this trick a lot so I can have full control over the overlays I'm about to draw on top. The only (and big) disadvantage is that "/dev/zero" is an endless stream of zeros, therefore we must limit the frames we are transcoding (using "-frames:v 30").

Once we have the empty input, our 'filter_complex' chain starts with loading the "square.png" image and overlaying it in the center of the frame. We name this stream 'canvas'. We then 'punching a hole' in it, using the 'chromakey' filter, with the color 0x008000 (or just green). We overlay this black frame with transparent round-square in the middle on top of the empty input and name this 'canvas3'.

We load the input video 'input.mp4' and scaling it to our canvas. Notice, you probably want to calculate these beforehand as all of the scaling must be determined before running this command. The '[0:][i1]overlay[i2]' filter is not really needed here, but we will use it to distort the video on the next part.

We then overlay the (no so much) distorted frame 'i2' and 'canvas3' (with the transparent hole in it) on top(!) and we name it 'mix1'. Lastly, '[0:][mix1]overlay[o]' is a simple copy and not really needed here, but will be used on the next part.

Again, this method should work with any green mask, including a video mask, which I find very cool for future artworks.

### Step 2: Retro it with Shaking and Recoloring:

{{< video src="distorted.mp4" autoplay="true" loop="true" >}}

```bash
# the input video distortion effect

[0:][i1]overlay='if(gt(random(0), 0.2), 1, 4)':'if(gt(random(0), 0.1), 1, 2)',colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131[i2]
```

Remember our '[i2]' video stream we skipped above? Let's make it shake a little with some overlay manipulation. On the X value, the "if" function will random a number between 0 and 1, if the number is bigger than 0.2 (20%), it will move the overlay by 4 pixels. I've included a couple of seconds at the end of the video to look at the video shaking on a 'still' image to break down the effect.

To recolor the video, we use "colorchannelmixer" filter and set the color channels values to something resembling a sepia tone. Funny, this is a manipulated AI colored video that for some reason looked older to me with these colors, at least more than a grayscale video.

### Step 3: Overlaying noise, grain, and dirt:

So I went googling and found this video on YouTube ([Damaged Old Film OVERLAY](https://www.youtube.com/watch?v=9v9VVN1RE84)), it was exactly what I was looking for. We do need to manipulate it a little would like to remove the green and overlay these old film imperfections ontop of our distorted video.

#### FFmpeg Code bellow

{{< video src="output.mp4" autoplay="true" loop="true" >}}



### The full command I used to generate this video:

```bash
# take input.mp4, square.png mask file and '9v9VVN1RE84.mp4' grit/film distortion video and overlay it on the frame
ffmpeg -y -f rawvideo -pix_fmt rgb32 -s 1920x1080 -i /dev/zero -r 30 -filter_complex "movie='square.png'[sqr];[0:][sqr]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2[canvas];[canvas]chromakey=0x008000:blend=0:similarity=0.15[canvas2];[0:][canvas2]overlay[canvas3];movie='input.mp4',scale=1920:1080[i1];[0:][i1]overlay='if(gt(random(0), 0.2), 1, 4)':'if(gt(random(0), 0.1), 1, 2)',colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131[i2];[i2][canvas3]overlay[mix1];movie='9v9VVN1RE84.mp4',scale=1920:1080[grit_i1];[grit_i1]chromakey=0x16FF0A:blend=0.2:similarity=0.3,colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3[grit1];[0:][mix1]overlay[o1];[o1][grit1]overlay[o]" -map "[o]" -c:v libx264 -crf 31 -frames:v 300 output.mp4
```

### Ideas of how to make it better

1. Making the video mask shake
1. Smoother frame shaking
1. More pixel distortion
1. More intersting coloring
1. More intersting overlay noise/grit video

Yes, this is quite complicated FFmpeg manipulation done in one FFmpeg execution, but only a basic understanding of FFmpeg filters is needed to accomplish such an effect. Feel free to reach out to me on this page, over at [the contact page](/contact) (anonymously!) or even better: hire me for your next advanced audio or video project.

Blessing, Elad 🌻
