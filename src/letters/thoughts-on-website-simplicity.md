---
title: Thoughts on website simplicity
author: Rene Kärkkäinen
---
# Thoughts on website simplicity

Written by Rene Kärkkäinen on 18.04.2026

Due to the recent vulnerabilities in NPM packages I have decided to avoid using NodeJS compleatly.

This website has been written with a combination of [markdown](https://en.wikipedia.org/wiki/Markdown) files and [Pandoc](https://pandoc.org/). In this new website I intend to write everything in markdown and then convert that to HTML with Pandoc.

### Backwards compatibility with old website
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