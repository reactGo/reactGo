console.log('hello from service worker')

self.addEventListener('message', (evt) => {
  console.log('message: ', evt.data)
})
