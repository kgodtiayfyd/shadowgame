self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("shadow").then(c =>
      c.addAll(["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"])
    )
  );
  self.skipWaiting();
});
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open("shadow").then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
