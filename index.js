const variantsListUrl =
  "https://cfw-takehome.developers.workers.dev/api/variants";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Returns a random number from 0 (inclusive) to max (exclusive)
 * using the current timestamp
 * @param {number} max 
 */
function getRandomInt(max) {
  return Date.now() % max;
}

/**
 * Fetch the URL variants through variantsListUrl
 */
async function fetchUrlVariants() {
  const response = await fetch(variantsListUrl);
  if (response.ok) {
    return await response.json();
  }
  return [];
}

/**
 * Fetch and choose a URL variant from an array with each element
 * having equal probability of being chosen
 */
async function chooseUrlVariant() {
  const urls = (await fetchUrlVariants()).variants;
  return urls[getRandomInt(urls.length)];
}

/**
 * Respond with one of the two variants given by variantsListUrl
 *
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    const urlChosen = await chooseUrlVariant();
    return await fetch(urlChosen);
  } catch (e) {
    console.log(`Exception ${e}`);
    return new Response("Internal Server Error", { status: 500 });
  }
}
