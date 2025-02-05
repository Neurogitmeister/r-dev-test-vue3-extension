const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms))

const retry = <T>(
  fn: () => Promise<T>,
  options?: {
    onRetry?: () => void
    retries?: number
    retryDelay?: number
    timeout?: number
  },
) => {
  const defaultOptions = { retries: 3, retryDelay: 1000, timeout: 20000 }

  const { onRetry, retries, retryDelay, timeout } = {
    ...defaultOptions,
    ...options,
  }
  return new Promise<T>((resolve, reject) => {
    // check for timeout
    if (timeout) setTimeout(() => reject("error: timeout"), timeout)

    const wrapper = (n: number) => {
      fn()
        .then((res) => resolve(res))
        .catch(async (err) => {
          if (onRetry) onRetry()
          if (n > 0) {
            await delay(retryDelay)
            wrapper(--n)
          } else {
            reject(err)
          }
        })
    }

    wrapper(retries)
  })
}

export { delay, retry }
