if(!self.define){let r,o={};const e=(e,i)=>(e=new URL(e+".js",i).href,o[e]||new Promise((o=>{if("document"in self){const r=document.createElement("script");r.src=e,r.onload=o,document.head.appendChild(r)}else r=e,importScripts(e),o()})).then((()=>{let r=o[e];if(!r)throw new Error(`Module ${e} didn’t register its module`);return r})));self.define=(i,d)=>{const a=r||("document"in self?document.currentScript.src:"")||location.href;if(o[a])return;let s={};const n=r=>e(r,a),c={module:{uri:a},exports:s,require:n};o[a]=Promise.all(i.map((r=>c[r]||n(r)))).then((r=>(d(...r),s)))}}define(["./workbox-db5fc017"],(function(r){"use strict";r.setCacheNameDetails({prefix:"goodmadlib-cover"}),self.addEventListener("message",(r=>{r.data&&"SKIP_WAITING"===r.data.type&&self.skipWaiting()})),r.precacheAndRoute([{url:"/good-mad-library/android-chrome-192x192.png",revision:"c71957533b2ce75ae368e96d67f542a8"},{url:"/good-mad-library/android-chrome-512x512.png",revision:"6202cabed92989a16fdde76dfd6df481"},{url:"/good-mad-library/apple-touch-icon.png",revision:"0102214cca60a3f1364df439f1ecfe83"},{url:"/good-mad-library/favicon-16x16.png",revision:"f5101475a4ff0362ae513745916b8249"},{url:"/good-mad-library/favicon-32x32.png",revision:"ec76fac6cdd24312af647bcc7376c19f"},{url:"/good-mad-library/index.html",revision:"6460da5ccda1cd2fc8169f7bb0ad791d"},{url:"/good-mad-library/manifest.json",revision:"72b649a6345dc267b573d5d70801e86f"},{url:"/good-mad-library/static/css/app.5a699724.css",revision:null},{url:"/good-mad-library/static/css/chunk-vendors.fcb30876.css",revision:null},{url:"/good-mad-library/static/js/app.7e9a8455.js",revision:null},{url:"/good-mad-library/static/js/chunk-vendors.ab03e7f5.js",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
