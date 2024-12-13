---
title: "🗒 Google Photos and The AI Reality We Currently Live In"
date: 2019-03-26T15:47:28+02:00
categories: ["writings"]
tags: ["opinion", "blog"]
discussionId: "2019-03-26-Google-Photos"
---

# Google Photos and The AI Reality We Currently Live In. My Case Against "Google Photos"

{{< figure src="cover.png" title="Humanity in the age of #AIReality" >}}

Back in 2015 Google announced its revolutionary new Photos service named Google Photos. The service offers unlimited data to host your photos. According to [Wikipedia](https://en.wikipedia.org/wiki/Google_Photos), there are over 1.2 billion photos are uploaded to the service every day and this estimation is likely to be an outdated.

Every new picture "backed up" on the cloud service, is been scanned, categorized and analyzed in the cloud using Google's Machine Intelligence and Cloud Vision API.

On the last week  I dived as deep as I possibly could into the service. I walked in trying to answer a simple question: **What does Google learn about *me* by looking at my snaps?**

A year ago I decided to drink the Kool-Aid and purchased my first Android phone. I got a [Google Pixel 2](https://www.youtube.com/watch?v=KvNis_A6UaI), which objectively has a mind blowing camera and is a really great phone in general. I'm definitely not a [Photoholic](https://www.urbandictionary.com/define.php?term=Photoholic), but like most of us, I like to snap some of those good memories.
Recently, I landed back from a long trip to India. I started organizing my photos and noticed a few hints to the service's hidden secret.

Recently, I landed back from a long trip to India. I started organizing my photos and noticed a few hints to the service's hidden secret.

{{< figure src="dharamshala-search.png" title="Google Photos search suggestion">}}

I will consider myself pretty tech-savvy. I write code in Silicon Valley, experienced with big data and dipped my toes in the field of Computer Vision. When the search bar suggested "Dharamshala", a city I visited not awhile ago, I was not surprised at all. The service uses my photos [GPS or EXIF metadata](https://en.wikipedia.org/wiki/Exif), together with a [geo-fence](https://en.wikipedia.org/wiki/Geo-fence) to collect photos taken in the same area. Seems legit and probably helpful.

The service also offers pretty neat organization features for your photo library using the [assistant mode](https://photos.google.com/assistant), which helps users "fix" pictures, generate albums quickly or archive those not so interesting pictures - such as documents. I started to wonder, what data it takes to distinguish a nice photo from a ugly uninteresting picture of a document? and how did google's smart assistant found those documents in my phone photo library? That thing is smart!

{{< figure src="documents-search.png" title="Documents in Google Photos" >}}

## 1 Picture Equals 100,000 Search Indexes

I was thinking "Search. hmm, what else could I find in there?" I was mesmerized and a little freaked out with the **quality of the results the search function provided**. Then, as an engineer I got a little worried. Just what type of data is Google been indexing on my personal photo library, to produce such detailed results???

On the official keynotes Google will present some simple use case such as "Me 1990", "New York City" or "Hiking", but these do not even scratch the surface of how advanced the search capabilities of the service is. So I ran my own little experiment and discovered:

> It takes less then a minute between the moment you snap a picture until Google figures out everything about it.

Try it yourself. Take a picture of something very obvious like blue t-shirt and see how long does it take from the moment you pushed the capture button till "blue t-shirt" appears on the Google search. My results vary between 40 to 120 seconds. Duration may vary, but those were my numbers.

Bellow are a couple of breathtakingly accurate results from my own photo library. I encourage you to [try it yourself](https://photos.google.com/u/1/search/street%20sign) using the search feature. If you are a Google Photos user, here are some search ideas: "curly hair", "blue t-shirt", "identification card", "sad", "watercraft", "studio", 🔥 (the fire emoji)

{{< figure src="bayarea-landmarks.png" title="Pictures of landmarks capture in the \"bay area\" (i.e. the San Francisco bay area)" >}}

{{< figure src="purple-bag-search.png" title="Pictures of bags which are also colored purple" >}}

{{< figure src="long-hair-search.png" title="Facial features such as \"long hair\" or \"dark curls\" could be detected" >}}

{{< figure src="chevrolet.png" title="By detecting the logo inside the picture, the search returned only pictures with the Chevrolet brand in them" >}}

## Deep Understanding, How Does It Works?

In the world of Google Photos, the true star of the show is **Cloud Vision Technology**. On the services' [marketing page](https://cloud.google.com/vision/) Google describes the service as such:

>"**Cloud Vision API** enables developers to understand the content of an image by encapsulating powerful machine learning models in an easy-to-use REST API. It quickly **classifies images** into thousands of categories (such as, "sailboat"), **detects individual objects** and faces within images, and **reads printed words** contained within images. You can build metadata on your image catalog, moderate offensive content, or **enable new marketing scenarios through image sentiment analysis.**"

This explains a lot about what happens behinds the curtain on Google Photos. In simple terms, if you are a Google Photos user, every photo you takes goes into deep analysis on the Cloud Vision service. Google labels whats inside it, read the printed text on your documents, rate it for adult material and executes many other analyses on it.

It's very likely that Google communicate all of this data internally to its different services, including its ads services, search and more. Also, it's very likely that Google uses its users data to further advance its capabilities in the Computer Vision field. I could not find evidence for this in any of the published user policies or on while reviewing my account data on Google Takeout, but the fact that this data exists somewhere in the Google ecosystem is indisputable.

On [Technology Policies](https://policies.google.com/technologies) page Google explains:

> **How Google uses pattern recognition to make sense of images?**
Computers don't "see" photos and videos in the same way that people do. When you look at a photo, you might see your best friend standing in front of her house. From a computer's perspective, that same image is simply a bunch of data that it may interpret as shapes and information about color values. While a computer won't react like you do when you see that photo, **a computer can be trained to recognize certain patterns of color and shapes**. For example, a computer might be trained to recognize the common patterns of shapes and colors that make up a digital image of a landscape such as a beach **or an object like a car**. This technology **helps Google Photos organize your photos** and lets users find any photo with a simple search.

Once every item is labeled, search is no-brainier for the search giant. Funny enough, I actually found it difficult to think of items that appeared in a photo I took which the labeling mechanism missed. As far as I understand, there are no limits to the labels Google applies to every photo. Those labels are also known as machine-generated identifiers (MIDs) and are part of Google's efforts to organize all of [human knowledge](https://en.wikipedia.org/wiki/Knowledge_Graph) under a [searchable graph](https://medium.freecodecamp.org/a-gentle-introduction-to-data-structures-how-graphs-work-a223d9ef8837).

High confidence labeling to images results in a narrow and accurate search, but search is just the beginning. The better this labeling system is, the **more knowledge** the service collects about its users.

This multi level labeling is the true hidden power of Google to **source knowledge** from data. This is how for example Google will distinguish between "food", "truck" and "food truck". In addition, it's extremely likely that the Google Vision service can already today label things as good as the average person can.

{{< figure src="car-vs-car-crash.png" title="Car vs Car Crash Google Image Search" >}}

###### Above: pictures labeled "car" below: pictures labeled "car" which are also labeled "crash"

Think for a second of the knowledge exists inside your photo library. Knowledge about yourself, about your relatives and about the world we live in. Lets do this little test, can you find evidence of your Political affiliation in your photos? How about your preferred weekend activity? Which parent are you closer to and why? All it takes is a couple of searches.

## How Deep This Rabbit Hole Goes?

Google makes it super easy for you to try an analyze images yourself on the [Cloud Vision API](https://cloud.google.com/vision/) marketing page.

{{< figure src="cloud-vision-drag-n-drop.png" title="Google Cloud Vision API - Drag and Drop image to Analyze" >}}

Challenge it with something weird and complex and test yourself how deep the rabbit hole goes. Post it online using the hashtag **#AIreality** so we can all see.

Here are some examples:

{{< figure src="cloud-vision-results.png" title="Cloud Vision Analysis examples" >}}

## Final Thoughts or Just How Bad Is This?

In his [2016 TED talk](https://www.ted.com/talks/sam_harris_can_we_build_ai_without_losing_control_over_it) Sam Harris claims that "Intelligence is a matter of information processing" and I completely agree. Machine intelligence is a common business practice in 2019. I believe that the average person will be nothing but shock to discover how smart our machines have gotten.

Is Google existence is a problem? I don't believe so.

If Google did not existed, some other company, say Facebook, would have made similar technology. Actually, it is pretty naive to think that an organization such as Facebook, the Chinese government or the CIA do not currently have equivalent or even better technology.

The real problem I believe is **the lack of awareness to this, as a problem**. I found that many of my relatives, friend and other people who works in the tech industry, really don't mind someone have access to this data. It feels like no one cares and I really wonder why?

This fact, together with the idea that it is just a matter of time until machines will outsmart humans, **gets me really worried about the future**. I really hope the time and effort I'm putting into publishing this will help us educate the world about the artificial intelligence world we **currently live in**.

This fact, together with the idea that it is just a matter of time until machines will outsmart humans, gets me really worried about the future. I really hope the time and effort I'm putting into publishing this will help us educate the world about the current powers of artificial intelligence.

Google is a tech giant producing truly remarkable, state-of-the-art artificial intelligence technology. Google controls internet browsing. Google understand who you are and how much time you spend reading this article. Google knows what car you drive and with access to your camera Google actually labels everything meaningful in  your personal life.

> If Google will put their mind into it, they can  even research how many users decided to quit using Google after reading this article.

I believe this is too much power to be placed in the hands of too few individuals, regardless of whom it is. Imagine that the US government had the power to be analyzing all of your private family photos. This is an unacceptable thought for most people, **yet this is a current reality for [1.4 billion Chinese citizens](https://www.businessinsider.com/how-china-is-watching-its-citizens-in-a-modern-surveillance-state-2018-4)**.

We live in an **#AIreality** no one is talking about it. About 30 politicians already announce they will be running for the upcoming 2020 elections in the United States, I wish someone will ask them anything about it.

Thank you for reading. Feel free to email me your thoughts to elad@gariany.com