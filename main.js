const {app} = require('electron');
const ProgressBar = require('./ProgressBar')

app.whenReady().then(() => {
  const progressBar = new ProgressBar({
    maximum: 100,
    value: 50,
    indeterminate: false
  });

  setTimeout(()=>{
    progressBar.value = 80;
    console.log(progressBar.value);
  }, 1000)

  setTimeout(()=>{
    progressBar.detail = '123M / 456M downloaded';
    console.log(progressBar.detail);
  }, 2000)

  setTimeout(()=>{
    progressBar.text = 'Downloading...';
    console.log(progressBar.text);
  }, 3000)

  setTimeout(()=>{
    progressBar.maximum = 200;
    console.log(progressBar.maximum);
  }, 4000)

  setTimeout(()=>{
    progressBar.indeterminate = true;
    console.log(progressBar.indeterminate);
  }, 5000)

  setTimeout(()=>{
    progressBar.title = 'Downloading...';
    console.log(progressBar.title);
  }, 6000)

  setTimeout(()=>{
    progressBar.close()
    console.log('closed');
  }, 7000)
});
