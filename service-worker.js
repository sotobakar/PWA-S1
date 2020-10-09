const CACHE_NAME = "profile-cache-v1";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./pages/home.html",
  "./pages/about.html",
  "./pages/contact.html",
  "./pages/almamater.html",
  "./css/materialize.min.css",
  "./css/style.css",
  "./js/materialize.min.js",
  "./js/nav.js",
  "./icon-192x192.png",
  "./icon-512x512.png",
  "./assets/TK.png",
  "./assets/sd-smp.jpg",
  "./assets/sma.jpg",
  "./assets/pt.png",
  "./assets/thunder.png",
  "./assets/facebook.svg",
  "./assets/mail.svg",
  "./assets/phone.svg",
  "./assets/pp.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});