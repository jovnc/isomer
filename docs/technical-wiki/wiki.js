const searchInput = document.querySelector("#wiki-search")
const pages = Array.from(document.querySelectorAll(".doc-page"))
const tocLinks = Array.from(document.querySelectorAll(".toc a"))

const emptyState = document.createElement("div")
emptyState.className = "search-empty"
emptyState.textContent = "No sections match your search."
document.querySelector(".content").insertBefore(emptyState, pages[1] ?? null)

const normalise = (value) => value.toLowerCase().replace(/\s+/g, " ").trim()

const pageIndex = pages.map((page) => ({
  element: page,
  id: page.id,
  title: page.dataset.title ?? page.querySelector("h2")?.textContent ?? page.id,
  text: normalise(page.textContent ?? ""),
}))

const setActiveLink = (id) => {
  tocLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`)
  })
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

    if (visible[0]?.target.id) {
      setActiveLink(visible[0].target.id)
    }
  },
  {
    rootMargin: "-18% 0px -70% 0px",
    threshold: [0.08, 0.18, 0.32],
  },
)

pages.forEach((page) => observer.observe(page))

const applySearch = () => {
  const query = normalise(searchInput.value)
  document.body.classList.toggle("has-search", query.length > 0)

  let matches = 0
  pageIndex.forEach(({ element, text, title }) => {
    const matched =
      query.length === 0 ||
      text.includes(query) ||
      normalise(title).includes(query)

    element.classList.toggle("hidden-by-search", !matched)
    if (matched) matches += 1
  })

  emptyState.classList.toggle("visible", query.length > 0 && matches === 0)
}

searchInput.addEventListener("input", applySearch)

document.addEventListener("keydown", (event) => {
  const isMac = navigator.platform.toUpperCase().includes("MAC")
  const shortcutPressed = isMac ? event.metaKey : event.ctrlKey

  if (shortcutPressed && event.key.toLowerCase() === "k") {
    event.preventDefault()
    searchInput.focus()
    searchInput.select()
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = ""
    applySearch()
    searchInput.blur()
  }
})

document
  .querySelectorAll("section[id] h2, header[id] h2")
  .forEach((heading) => {
    const parent = heading.closest("[id]")
    if (!parent) return

    heading.classList.add("anchored-heading")
    heading.tabIndex = 0
    heading.title = "Click to copy a link to this section"
    heading.addEventListener("click", async () => {
      const url = `${window.location.origin}${window.location.pathname}#${parent.id}`
      try {
        await navigator.clipboard.writeText(url)
        heading.dataset.copied = "true"
        window.setTimeout(() => {
          delete heading.dataset.copied
        }, 1200)
      } catch {
        window.location.hash = parent.id
      }
    })
  })
