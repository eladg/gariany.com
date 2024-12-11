---
title: "FFmpeg: Make a CRT SCAN Lines Filter"
date: 2020-05-13T16:59:02-07:00
categories: ["code"]
tags: ["ffmpeg", "gist", "video-tech"]
discussionId: "ffmpeg-CRT-scan-lines-filter"
---

## FFmpeg: Make a CRT SCAN Lines Filter

![FFmpeg CRT Lines](output.png)

Over on [Reddit](https://www.reddit.com/r/ffmpeg/comments/gftty1/scan_line_artifact_driving_me_crazy/) someone was having a little issue with this complex FFmpeg filter which I found very cool. I love this filter so I thought it should be documented somewhere. I offered some help fixing the issue and have this filter in my FFmpeg arsenal.

```bash
# you will need these files:
# -> https://www.gariany.com/2020/05/ffmpeg-make-a-crt-scan-lines-filter/scanline_pattern_croped.png

ffmpeg -loglevel debug -y -f lavfi -i color=c=black:s=1216x896 -filter_complex "movie='bg_croped.png',format=rgba,setsar=1:1[bgc];movie='scanline_pattern_croped.png'[spc];movie='main.png',format=rgba,scale=iw:ih*4:flags=neighbor,scale=iw*4:ih:flags=bilinear[input];[bgc][input]overlay[tmp];[tmp][spc]blend=all_mode=softlight:all_opacity=0.15[tmp2];[0][tmp2]overlay[o]" -map "[o]" -frames:v 1 output.png
```

I was able to isolate the issue using a set of scripts I developed in 2014 called [FFExtra](https://github.com/eladg/ffextra). I found out that there was [some issue](screenshot.png) with the input files, which prevented the filter from composing properly.

To run the FFmpeg command you will need the [scanline_pattern_croped.png](scanline_pattern_croped.png) file.

Here are some of my test commands:

```bash
ffmpeg -loglevel debug -y -f lavfi -i color=c=black:s=1216x896 -filter_complex "movie='scanline_pattern_croped.png'[spc];movie='main.png',format=rgba,scale=iw:ih*4:flags=neighbor,scale=iw*4:ih:flags=bilinear[in0];[in0][spc]blend=all_mode=softlight:all_opacity=0.15[frame];[0][frame]overlay[o]" -map "[o]" -frames:v 1 output.png
```

```bash
ffmpeg -loglevel debug -y -f lavfi -i color=c=black:s=618x360 -filter_complex "movie='scanline_pattern_croped_360p.png',scale=618:360[spc];movie='input.mp4',format=rgba[in0];[in0][spc]blend=all_mode=softlight:all_opacity=0.20[frame];[0][frame]overlay[o]" -map "[o]" output.mp4
```

### Brings some memories ah?

{{< video src="output.mp4" autoplay="true" loop="true" >}}

Blessing, Elad 🌻