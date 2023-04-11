const { ipcRenderer } = require('electron')

process.once('loaded', () => {
  window.addEventListener('message', evt => {
    if (evt.data.type === 'select-dirs') {
      ipcRenderer.send('select-dirs', evt.data.arg)
    }
    else if (evt.data.type === 'import-cad') {
      ipcRenderer.send('import-cad', evt.data.arg)
    }
    else if (evt.data.type === 'run-dll') {
      ipcRenderer.send('run-dll', evt.data.arg)
    }
  })
})