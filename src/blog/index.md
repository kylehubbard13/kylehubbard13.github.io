---
layout: base.njk
title: Blog
permalink: /blog/
---
# Blog

<ul class="post-list">
{% for post in collections.post %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% else %}
  <li class="placeholder">No posts yet.</li>
{% endfor %}
</ul>
