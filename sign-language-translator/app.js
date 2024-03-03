self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('https://w3cart.dexignzone.com/xhtml/page-error-404.html').then((cache) => cache.addAll([
			'/'
		])),
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request);
		})
	);
});