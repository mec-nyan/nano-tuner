const VERSION = 'v0.1.2'

const CACHE_NAME = `nano-tuner-${VERSION}`

const GPATH = '/nano-tuner'

const APP_STATIC_RESOURCES = [
  `${GPATH}/`,
  `${GPATH}/index.html`,
  `${GPATH}/assets/index.css`,
  `${GPATH}/assets/index.js`,
  `${GPATH}/manifest.json`,
  `${GPATH}/icons/icon.svg`,
  `${GPATH}/screenshots/nano-tuner-screenshot-narrow.png`,
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      cache.addAll(APP_STATIC_RESOURCES)
    })()
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
          return undefined
        })
      )
      await clients.claim()
    })()
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME)
        const cachedResponse = await cache.match(`${GPATH}/`)
        if (cachedResponse) {
          return cachedResponse
        }

        // Fallback if somehow not cached:
        try {
          const response = await fetch(e.request)
          return response
        } catch (err) {
          return new Response(null, { status: 404 })
        }
      })()
    )
    return
  }

  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const cachedResponse = await cache.match(e.request.url)
      if (cachedResponse) {
        return cachedResponse
      }
      try {
        const response = await fetch(e.request)
        return response
      } catch (err) {
        return new Response(null, { status: 404 })
      }
    })()
  )
})
