export function getIndex(arr, key, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return i;
    }
  }
}

export function getBase64(queue, cb) {
  let value = '';
  queue.forEach(item => {
    const reader = new FileReader();
    reader.readAsDataURL(item._file);
    reader.onload = () => {
      if (value) {
        value = value + '|' + reader.result;
      } else {
        value = '' + reader.result;
      }
      cb(value);
    };
  });
}

export function fileToBase64(file, cb) {
  let value = '';
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    if (value) {
      value = value + '|' + reader.result;
    } else {
      value = '' + reader.result;
    }
    cb(value);
  };
}

export function imgToBase64(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
  const dataURL = canvas.toDataURL('image/' + ext);
  return dataURL;
}

export function downloadImg(url, cb) {
  const src = url;
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');
  img.setAttribute('crossOrigin', 'Anonymous');
  img.src = src;
  img.onload = (e) => {
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);
    // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
    // saveAs(imageDataUrl, '附件');
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    canvas.toBlob((blob) => {
      cb(window.URL.createObjectURL(blob));
    }, 'image/jpeg');
  };
}
