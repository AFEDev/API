export async function  loadAPIdata (url, divForLoaderID) {
  let loader = document.getElementById(divForLoaderID)
  loader.innerHTML = `<div class='loader'></div>`;

  const response = await fetch(url, {
    method: 'GET',
  });
  const responseResult = await response.json();
console.log(response);
  if (response.ok) {
   return responseResult;
  } else {
   return loader.innerHTML = response.message;
  }
}

