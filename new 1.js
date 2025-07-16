const CACHE_NAME = 'vkusniy-minimum-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/recipes.html',
  '/suggest_recipe.html',
  '/style.css',
  '/script.js',
  '/recipe_oatmeal.html',
  '/recipe_toast.html',
  '/recipe_pasta.html'
  // Добавьте другие HTML-файлы рецептов
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});