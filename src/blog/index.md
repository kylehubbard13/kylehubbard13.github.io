---
layout: page.njk
title: Blog
eyebrow: Writing
permalink: /blog/
description: Notes on alliances, AI security, and getting two organizations to describe the same thing the same way.
---
# Writing

Notes on alliances, agent governance, and the work of getting two organizations to describe
the same thing the same way.

<ul class="postlist{% unless collections.post.size %} postlist--empty{% endunless %}">
{% for post in collections.post %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% else %}
  <li>First post in progress.</li>
{% endfor %}
</ul>
