export const SERP_CONFIG_NAMES = {
  yahoo: "yahoo",
  google: "google",
  bing: "bing",
  duckduckgo: "duckduckgo",
  yandex: "yandex",
} as const

export interface ISerpConfig {
  domain: string
  rx: RegExp
  selector: string
  hrefrx?: RegExp
  attr?: string
  position?: string
  root?: string
  style?: string
  name: keyof typeof SERP_CONFIG_NAMES
}

export const serpConfigs: ISerpConfig[] = [
  {
    name: SERP_CONFIG_NAMES.yahoo,
    domain: "search.yahoo.com",
    rx: /\/search.*fr=.*/,
    selector: "div#main h3 a",
    hrefrx: /=(https?:\/\/.+?)\/\//,
  },
  {
    name: SERP_CONFIG_NAMES.bing,
    domain: "www.bing.com",
    rx: /\/?search/,
    selector:
      "#b_results>.b_algo, #b_results>li, #b_results h2 a, div[class='sb_tlst'] * a",
    attr: "hover-url",
  },
  {
    name: SERP_CONFIG_NAMES.google,
    domain: "google.",
    rx: /^http(?:s)?:\/\/(?:www\.|encrypted\.)?google\..+/,
    selector: "div.g a:first-child",
    root: "h3",
    style: "padding-top: 20px",
  },
  {
    name: SERP_CONFIG_NAMES.duckduckgo,
    domain: "duckduckgo.com",
    rx: /^http(?:s)?:\/\/(?:www\.)?duckduckgo\..+/,
    selector: ".react-results--main li a[data-testid=result-title-a]",
  },
  {
    name: SERP_CONFIG_NAMES.yandex,
    domain: "yandex.",
    rx: /^http(?:s)?:\/\/(?:www\.)?yandex\..+/,
    selector: ".serp-item a:has(h2)",
    position: "after",
  },
]
