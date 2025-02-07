export const SERP_CONFIG_NAMES = {
  yahoo: "yahoo",
  google: "google",
  bing: "bing",
  duckduckgo: "duckduckgo",
  yandex: "yandex",
} as const

export interface ISerpConfig {
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
    rx: /^http(?:s)?:\/\/(?:www\.)?search\.yahoo\..*\/search.*fr=/,
    selector: "div#main h3 a",
    hrefrx: /=(https?:\/\/.+?)\/\//,
  },
  {
    name: SERP_CONFIG_NAMES.bing,
    rx: /^http(?:s)?:\/\/(?:www\.)?bing\..*\/?search/,
    selector:
      "#b_results>.b_algo, #b_results>li, #b_results h2 a, div[class='sb_tlst'] * a",
    attr: "hover-url",
  },
  {
    name: SERP_CONFIG_NAMES.google,
    rx: /^http(?:s)?:\/\/(?:www\.|encrypted\.)?google\..+/,
    selector: "div.g a:first-child",
    root: "h3",
    style: "padding-top: 20px",
  },
  {
    name: SERP_CONFIG_NAMES.duckduckgo,
    rx: /^http(?:s)?:\/\/(?:www\.)?duckduckgo\..+/,
    selector: ".react-results--main li a[data-testid=result-title-a]",
  },
  {
    name: SERP_CONFIG_NAMES.yandex,
    rx: /^http(?:s)?:\/\/(?:www\.)?(yandex|ya)\..+/,
    selector: ".serp-item a:has(h2)",
    position: "after",
  },
]
