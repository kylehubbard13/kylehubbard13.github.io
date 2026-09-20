---
layout: base.njk
title: Contact
---
# Contact

Have a project or question? Send a message below.

<form action="mailto:me@kylehubbard.tech" method="post" enctype="text/plain" class="contact-form">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="subject">Subject</label>
  <input type="text" id="subject" name="subject" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" required></textarea>

  <button type="submit" class="btn">Send</button>
</form>
