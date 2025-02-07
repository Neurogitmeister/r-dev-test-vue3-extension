export class UrlObserver {
  private previousUrl = ""

  private observer: MutationObserver | undefined

  constructor(callback: (url: string) => void) {
    this.observer = this.start(callback)
  }

  start = (callback: (url: string) => void) => {
    const observer = new MutationObserver(() => {
      const url = location.href
      if (url !== this.previousUrl) {
        this.previousUrl = url
        callback(url)
      }
    })
    observer.observe(document, { subtree: true, childList: true })
    return observer
  }

  disconnect = () => this.observer?.disconnect()
}
