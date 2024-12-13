
---
title: "Project: Midburn Tickets Queue System"
date: "2016-01-30T00:00:00Z"
lastmod: "2016-01-30T00:00:00Z"
author: "Elad Gariany"
tags: ["open-source", "project", "midburn"]
categories: ["code"]
---

## Project: Midburn Tickets Queue System

Midburn is the Israeli version of Burning man. It is by far, the fastest growing Burning man ispired gathering around the world. With the organization's quick growth came a huge challenge - The demand for tickets was so high that it will crash the organization frontend and backend systems as soon as tickets sell went online.

The system design was pretty basic for the young non-profit. Ticket sales were implemented in the user's profile CMS which was Drupal at the time.

While Drupal is a solid and well supported platfrom, it was not designed to handle traffic growth of 10000x during tickets sells. The poor single instance Drupal server couldn't handle the traffic.

After two failed sales, where only several hundreds tickets were sold (out of 8000!), the Midburn team decided to try out a solution I quickly crafted for them.

The idea was super simple. I implemented a simple queue, where during the ticket sell period, you would enter your profile email address on a static HTML page hosted on a CDN. The page would subbmit a POST request to s scalable Heroku endpoint which wrote the user's submition to a single redis DB.

Once and if your time to purchese the ticket has arrived, you will be notified over email and be redirected to the backoffice Drupal server.

The solution took less than a day to implemented and at the time was about 60 lines of code. This was proven to be a super succesful implementation a modified system is still supported by the orgniazation till this day.

Nowadays the system was phase out to a different serverless solution based on native AWS. The original repository can be find here: https://github.com/midburn/midburn-queue

