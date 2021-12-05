import {createTableOfContents} from './toc.js';

addEventListener('load', () => {
  const articles = Array.from(document.querySelectorAll('article[id]'));

  const toc = createTableOfContents();

  document.body.insertBefore(toc, document.querySelector('main'));

  const tocButton = document.createElement('button');
  tocButton.id = 'toc-button';
  tocButton.textContent = '☰';
  document.body.appendChild(tocButton);

  tocButton.addEventListener('click', () => {
    document.body.classList.toggle('show-toc');
  });

  document.querySelector('main').addEventListener('click', () => {
    document.body.classList.remove('show-toc');
  });

  addEventListener('hashchange', () => {
    document.body.classList.remove('show-toc');
  });

});
