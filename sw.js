const CACHE='minha-semana-v6-0-new-domain';
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./manifest.webmanifest'])))});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))]))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;if(req.mode==='navigate'||url.pathname.endsWith('/index.html')){event.respondWith(fetch(new Request(req,{cache:'no-store'})));return;}event.respondWith(fetch(req).catch(()=>caches.match(req)))});
