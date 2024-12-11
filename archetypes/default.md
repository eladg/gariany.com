---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
categories: [""]
tags: ["", ""]
discussionId: "{{ replace .Name " " "-" }}"
dont_show_comments: true
draft: true
image: ""
---