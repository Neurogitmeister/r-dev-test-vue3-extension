export const getCurrentTab = () =>
  new Promise<chrome.tabs.Tab | undefined>((resolve) =>
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
      resolve(tabs[0]),
    ),
  )

export const getCurrentTabUrl = () =>
  new Promise<string | undefined>((resolve, reject) =>
    getCurrentTab()
      .then((tab) => resolve(tab?.url))
      .catch(reject),
  )
