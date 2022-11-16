import {Feed} from 'feed';
import {JSDOM} from 'jsdom';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {writeFileSync} from 'node:fs';

const siteUrl = 'https://chrismondok.net';

const dir = dirname(fileURLToPath(import.meta.url));
const inFile = resolve(dir, '..', 'index.html');
const outFile = resolve(dir, '..', 'atom.xml');

const dom = await JSDOM.fromFile(inFile);

const feed = new Feed({
  title: dom.window.document.title,
  description: 'Chris Mondok’s personal website',
  id: siteUrl,
  copyright: '',
  link: siteUrl,
  author: {
    name: 'Chris Mondok',
  },
  feedLinks: {
    atom: 'https://chrismondok.net/atom.xml',
  },
  updated: new Date(),
});

for(const article of dom.window.document.querySelectorAll('article')) {
  const title = Array.from(article.querySelector('h2')!.childNodes)
    .filter(c => c.nodeName === '#text')
    .map(n => n.textContent)
    .join(' ')
    .trim();
  const id = article.getAttribute('id');
  const date = article.querySelector('time')!.getAttribute('datetime')!;

  const body = article.cloneNode(true) as typeof article;
  body.querySelector('header')?.remove();

  feed.addItem({
    title,
    date: new Date(date),
    link: `${siteUrl}#${id}`,
    content: body.innerHTML.trim(),
  });
}

writeFileSync(outFile, feed.atom1());
