function fetchData() {
    controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal })
      .then(function(response) {
        console.log('Download complete', response);
      })
      .catch(function(e) {
        console.log('Download error: ' + e.message);
      });
  }