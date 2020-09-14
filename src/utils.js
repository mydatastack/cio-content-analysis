const blockedResourceTypes = [
  'image',
  'media',
  'font',
  'texttrack',
  'object',
  'beacon',
  'csp_report',
  'imageset',
];

const skippedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
]

const delay = t =>
  new Promise(res => setTimeout(() => res(`waited for ${t} seconds`), t))

const hashCode = s => {
  var hash = 0, i, chr;
  if (s === undefined || s === NaN) {
    return
  }
  for (i = 0; i < s.length; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var counter = 0
            var timer = setInterval(() => {
                const max = 10000
                var scrollHeight = 
                document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                counter += 1
                if(counter === max){
                    clearInterval(timer);
                    resolve();
                }
            }, 20);
        });
    });
}

module.exports = { autoScroll, blockedResourceTypes, skippedResources, delay, hashCode }

