export interface ProjectConfig {
  /** Doubles as the i18n key: `projects.items.<id>.{name,hook,highlights}`
   *  must exist in both src/locales/en.json and src/locales/pt.json. */
  id: string
  /** Where the source lives. Opens in a new tab. */
  url: string
  /** Proper nouns, identical in both languages — hence here and not in the
   *  locale files, which would only invite the two copies to drift apart. */
  tech: string[]
  /** Optional path to a real screenshot under public/, e.g.
   *  '/projects/academic-search.jpg'. Omitted means the card renders without
   *  a thumbnail — never point this at a mockup or a placeholder. */
  image?: string
}

/** Order here is the order on the page. To add a project: append an entry,
 *  then add the matching `projects.items.<id>` block to BOTH locale files. */
export const PROJECTS: ProjectConfig[] = [
  {
    id: 'prosumer',
    url: 'https://github.com/JoaoCarlos134/prosumer',
    tech: ['Python', 'pandas', 'LightGBM', 'Chronos-2', 'FastAPI', 'React'],
    image: '/projects/prosumer.jpg',
  },
  {
    id: 'newsRadio',
    url: 'https://github.com/JoaoCarlos134/News_radio',
    tech: ['Python', 'asyncio', 'Ollama', 'Kokoro TTS', 'pytest', 'GitHub Actions'],
  },
  {
    id: 'academicSearch',
    url: 'https://github.com/JoaoCarlos134/academic-search',
    tech: ['Python', 'httpx', 'SQLAlchemy', 'sentence-transformers', 'Streamlit', 'Typer'],
    image: '/projects/academic-search.jpg',
  },
  {
    id: 'loom',
    url: 'https://github.com/JoaoCarlos134/Loom',
    tech: ['Python', 'FastAPI', 'SQLite', 'fastembed', 'pyarrow', 'pywebview'],
    image: '/projects/loom.jpg',
  },
]
