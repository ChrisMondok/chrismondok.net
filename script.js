class TableOfContents extends HTMLElement {
  connectedCallback() {
    this.append(createTableOfContents());
  }

  disconnectedCallback() {}
}

customElements.define("table-of-contents", TableOfContents);

function createTableOfContents() {
  const articles = Array.from(document.querySelectorAll("article[id]"));

  const links = Array.from(document.querySelectorAll("article[id]")).map(
    (article) => {
      const link = document.createElement("a");
      link.href = `#${article.id}`;
      link.textContent = article.querySelector("h2").textContent;
      link.article = article;
      return link;
    }
  );

  let timeout;

  const entries = links.map((link) => {
    const entry = document.createElement("li");
    entry.appendChild(link);
    return entry;
  });

  const list = document.createElement("ul");
  list.classList.add("link-list");
  for (const entry of entries) list.appendChild(entry);

  const nav = document.createElement("nav");
  nav.append(list);
  return nav;
}
