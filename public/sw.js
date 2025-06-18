const staticCacheName = 'static-site';
const dynamicCacheName = 'dynamic-site';

const ASSETS = ['/', '/index.html', '/offline.html'];

console.log('[SW] Hello from Service Worker');

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});

self.addEventListener('activate', async event => {
  const cachesKeysArray = await caches.keys();
  await Promise.all(
    cachesKeysArray
      .filter(key => key !== staticCacheName && key !== dynamicCacheName)
      .map(key => caches.delete(key))
  );
});

self.addEventListener('fetch', event => {
  console.log('fetch', event);
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then(response => {
        return networkFirst(request);
      }))
    );
  } catch (e) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    console.log('e:', e);
    const cached = await cache.match(request);
    return cached ?? caches.match('/offline.html');
  }
}
