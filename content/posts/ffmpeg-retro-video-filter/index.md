---
title: "FFmpeg: Step-by-Step Retro Video Filter"
date: 2020-08-19T15:59:02-07:00
categories: ["code"]
tags: ["ffmpeg", "gist", "video-tech"]
discussionId: "ffmpeg-retro-video-filter"
image: "poster.jpg"
---

## FFmpeg: A Step-by-Step Guide to Creating a Retro Video Filter

I've been missing working with FFmpeg, so when I encountered [this interesting challenge on Reddit](https://www.reddit.com/r/ffmpeg/comments/ibf0or/how_would_you_recreate_this_effect_with_ffmpeg/), I couldn't resist giving it a try. I'm currently looking for a new project as an Audio/Video Software Engineer or Project Manager, and this challenge provided a refreshing break from interviews. If you're hiring or have any interesting project proposals, [get in touch with me!](/contact) 🌻

The challenge was to create a retro video filter using only FFmpeg for a given video. Here are my results:

{{< video src="result.mp4" autoplay="true" loop="true" >}}

#### See Full FFmpeg Code Below

Wow... There's a lot to unpack here, but let's begin with the assets. I recently came across an incredible AI regenerative project by [Denis Shiryaev](https://www.youtube.com/channel/UCD8J_xbbBuGobmw_N5ga3MA) titled [San Francisco, a Trip down Market Street, April 14, 1906](https://www.youtube.com/watch?v=VO_1AdYRGW8), which was based on the [original video](https://youtu.be/1Zmhr3ubG2E?t=194). Shout out to Denis—your work is truly remarkable!

I thought it would be fun to add a retro twist, and it also allows for a comparison with the original 1906 footage.

### Step 1: Masking the Video

We begin by creating a square mask to give the video that classic round-rectangle appearance. I used [ImageMagick](https://imagemagick.org/index.php) to generate the shape. I could have created this shape with an FFmpeg filter, but I opted for ImageMagick since it offers a versatile method to mask any video with any shape—even if that shape is a video file!

First, we create the round rectangle that will serve as our mask:

```bash
# Generate square.png mask file
convert -size 1000x1000 xc:transparent -fill green -stroke green -draw "roundrectangle 0,0 1000,1000, 100,100" square.png
```

**Result:**

{{< figure src="square250x250.png">}}

### Chromakey Green-Screen FFmpeg Masking

{{< video src="masked_video.mp4" autoplay="true" loop="true" >}}

```bash
# Mask input.mp4 with square.png mask
ffmpeg -y -f rawvideo -pix_fmt rgb32 -s 1920x1080 -i /dev/zero -r 30 -filter_complex "movie='square.png'[sqr];[0:][sqr]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2[canvas];[canvas]chromakey=0x008000:blend=0:similarity=0.15[canvas2];[0:][canvas2]overlay[canvas3];movie='input.mp4',scale=1920:1080[i1];[0:][i1]overlay[i2];[i2][canvas3]overlay[mix1];[0:][mix1]overlay[o]" -map "[o]" -c:v libx264 -crf 31 -frames:v 300 masked_video.mp4
```

We start with an empty 1920x1080 canvas by using `/dev/zero` as our data source with the RGB32 pixel format. I use this trick often because it gives me full control over the overlays I apply. The only downside is that `/dev/zero` is an endless stream of zeros, so we must limit the number of frames (using `-frames:v 30`).

Once we have our empty canvas, the `filter_complex` chain begins by loading the `square.png` image and overlaying it at the center of the frame, creating a stream called `canvas`. Next, we "punch a hole" in this canvas using the `chromakey` filter with the green color (`0x008000`). This modified frame is overlaid onto the empty canvas and named `canvas3`.

Then, we load the input video (`input.mp4`) and scale it to match our canvas. Although the filter `[0:][i1]overlay[i2]` isn't strictly necessary, it sets the stage for the distortion applied in the next step.

Finally, we overlay the slightly distorted video (`i2`) onto `canvas3\) (which contains the transparent round-rectangle), naming the result `mix1`. The final overlay `[0:][mix1]overlay[o]` essentially copies the stream, preparing it for the subsequent effect.

This method works with any green mask—even a video mask—which opens up exciting possibilities for future projects.

### Step 2: Adding Retro Effects with Shaking and Recoloring

{{< video src="distorted.mp4" autoplay="true" loop="true" >}}

```bash
# Apply video distortion effect
[0:][i1]overlay='if(gt(random(0), 0.2), 1, 4)':'if(gt(random(0), 0.1), 1, 2)',colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131[i2]
```

Remember the `[i2]` stream we set aside earlier? Here, we introduce a subtle shaking effect through overlay manipulation. For the X offset, the `if` function generates a random number between 0 and 1; if this number is greater than 0.2 (a 20% chance), the overlay shifts by 4 pixels. I added a few seconds at the end of the video to highlight this shaking effect on a static image.

To achieve the retro look, we apply the `colorchannelmixer` filter to adjust the color channels to resemble a sepia tone. Interestingly, this AI-manipulated video ends up looking even older with these colors—arguably more so than a simple grayscale effect.

### Step 3: Overlaying Noise, Grain, and Dirt

I discovered an ideal resource on YouTube titled [Damaged Old Film OVERLAY](https://www.youtube.com/watch?v=9v9VVN1RE84) that perfectly matched the look I was aiming for. We do need to tweak it slightly to remove the green tint and overlay these film imperfections onto our distorted video.

#### FFmpeg Code Below

{{< video src="output.mp4" autoplay="true" loop="true" >}}

### Full Command Used to Generate This Video

```bash
# Combine input.mp4, square.png mask, and the grit/film distortion video '9v9VVN1RE84.mp4'
ffmpeg -y -f rawvideo -pix_fmt rgb32 -s 1920x1080 -i /dev/zero -r 30 -filter_complex "movie='square.png'[sqr];[0:][sqr]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2[canvas];[canvas]chromakey=0x008000:blend=0:similarity=0.15[canvas2];[0:][canvas2]overlay[canvas3];movie='input.mp4',scale=1920:1080[i1];[0:][i1]overlay='if(gt(random(0), 0.2), 1, 4)':'if(gt(random(0), 0.1), 1, 2)',colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131[i2];[i2][canvas3]overlay[mix1];movie='9v9VVN1RE84.mp4',scale=1920:1080[grit_i1];[grit_i1]chromakey=0x16FF0A:blend=0.2:similarity=0.3,colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3[grit1];[0:][mix1]overlay[o1];[o1][grit1]overlay[o]" -map "[o]" -c:v libx264 -crf 31 -frames:v 300 output.mp4
```

### Ideas for Improvement

1. Introduce movement to the video mask.
2. Create smoother frame shaking.
3. Increase pixel distortion.
4. Experiment with more intriguing color schemes.
5. Enhance the overlay with additional noise and grit effects.

This is quite a complex FFmpeg manipulation executed in a single command, but it only requires a basic understanding of FFmpeg filters to achieve the effect. Feel free to reach out on the [contact page](/contact) (anonymously if you prefer), or even better, hire me for your next advanced audio or video project.

Blessings,  
Elad 🌻