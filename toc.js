export function createTableOfContents() {
  const articles = Array.from(document.querySelectorAll('article[id]'));

  const links = Array.from(document.querySelectorAll('article[id]')).map(article => {
    const link = document.createElement('a');
    link.href = `#${article.id}`;
    link.textContent = article.querySelector('h2').textContent;
    link.article = article;
    return link;
  });

  let timeout;

  addEventListener('scroll', () => {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(updateLinkActiveStates, 100);
  });

  addEventListener('resize', () => {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(updateLinkActiveStates, 100);
  });

  const entries = links.map(link => {
    const entry = document.createElement('li');
    entry.appendChild(link);
    return entry;
  });

  const list = document.createElement('ul');
  for(const entry of entries) list.appendChild(entry);

  updateLinkActiveStates();

  const nav = document.createElement('nav');
  nav.id = 'toc';
  nav.appendChild(list);
  return nav;

  // Is there really no pseudo-class for "link that matches href???"
  function updateLinkActiveStates() {
    const mostVisible = articles
      .map(article => ({article, visible: getVisibleHeight(article)}))
      .reduce((l, r) => l.visible < r.visible ? r : l)
      .article;

    for(const link of links) {
      const active = link.article === mostVisible;
      if(active) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }

}

function getVisibleHeight(element) {
  const top = Math.max(0, element.offsetTop - window.scrollY);
  const bottom = Math.min(window.innerHeight, element.offsetTop + element.offsetHeight - window.scrollY);
  const visibleAmount = Math.max(0, bottom - top);
  return visibleAmount;
}
