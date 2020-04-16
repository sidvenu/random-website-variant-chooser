import ModifyResponse from "./modify-response";

const variantsListUrl =
  "https://cfw-takehome.developers.workers.dev/api/variants";

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Returns a random number from 0 (inclusive) to max (exclusive)
 * using the current timestamp
 *
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(max) {
  if (max <= 0) {
    return 0;
  }
  return Date.now() % max;
}

/**
 * @typedef {Object} UrlVariants
 * @property {Array<string>} variants - The URL variants
 */

/**
 * Fetch the URL variants through variantsListUrl
 *
 * @returns {Promise<UrlVariants>}
 */
async function fetchUrlVariants() {
  const response = await fetch(variantsListUrl);
  if (response.ok) {
    return await response.json();
  }
  return { variants: [] };
}

/**
 * Fetch and choose a URL variant from an array with each element
 * having equal probability of being chosen
 *
 * @returns {Promise<string>}
 */
async function chooseUrlVariant() {
  const urls = (await fetchUrlVariants()).variants;
  return urls[getRandomInt(urls.length)];
}

/**
 * Respond with the modified version of one of the two variants
 * given by variantsListUrl
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  try {
    const urlChosen = await chooseUrlVariant();
    return ModifyResponse.modifyResponse(await fetch(urlChosen));
  } catch (e) {
    console.log(`Exception ${e}`);
    return new Response("Internal Server Error", { status: 500 });
  }
}
