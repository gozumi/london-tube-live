self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.clientsClaim()
workbox.skipWaiting()
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})