# Personal Website

Due to the recent voulnerabilities in NPM packages I have decided to avoid using NodeJS compleatly.

This website has been written with a combination of [markdown](https://en.wikipedia.org/wiki/Markdown) files and [pandoc](https://pandoc.org/). In this new website I intend to write everything in markdown and then convert that to HTML with pandoc.

### Backwards compability with old website
Certain tools from the old website might not work. I have made sure that the following tools work:

- [WebAuthn tool at webauthn.karkkainen.net](https://webauthn.karkkainen.net/)
  - This is an independent site so it is not affected.
- [Vinly Record catalog](../records/index.html)
  - The old record catalog still works.

The certificate catalog is not implemented in the new website yet.

### Credits
Inspiration for this new website was taken from the following websites:

- [motherfuckingwebsite.com](https://motherfuckingwebsite.com/)
- [bettermotherfuckingwebsite.com](http://bettermotherfuckingwebsite.com/)
- [thebestmotherfucking.website](https://thebestmotherfucking.website/)

### How to make a new page
Create a ```.md``` file in ```src/```. For example look in /src/index.md.

Example page:
```text
---
title: My Page
description: A simple page about my project
author: Your Name
url: https://example.com/index.html
image: https://example.com/preview.png
---
# Title
Paragraph
```

Then build the website with by running the script ```build.sh```