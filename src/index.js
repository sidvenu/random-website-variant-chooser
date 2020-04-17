import ModifyResponse from "./modify-response";
import CookieManager from "./cookie-manager";

const variantsListUrl =
  "https://cfw-takehome.developers.workers.dev/api/variants";
const chosenUrlCookieName = "chosenUrlIndex";
let chosenUrlIndex = NaN;

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
 * If a cookie is set already that has the chosenUrlIndex, then
 * use the chosenUrlIndex to choose from the URL variants.
 * If not, choose a URL variant from the array with each
 * element having equal probability of being chosen, and set
 * a cookie with that value.
 *
 * @param {Request} request
 * @param {Array<string>} urls
 * @returns {string}
 */
function chooseUrlVariant(request, urls) {
  chosenUrlIndex = getRandomInt(urls.length);

  const cookieValue = CookieManager.getCookie(
    chosenUrlCookieName,
    request.headers.get("Cookie")
  );
  if (!isNaN(Number(cookieValue))) {
    chosenUrlIndex = Number(cookieValue);
  }

  return urls[chosenUrlIndex];
}

/**
 * Uses the Set-Cookie header to set the chosen URL index in a
 * cookie "chosenUrlCookie"
 *
 * @param {string} cookie
 * @param {Response} response
 */
function setCookieInResponse(response) {
  response.headers.set(
    "Set-Cookie",
    CookieManager.bakeCookie(chosenUrlCookieName, `${chosenUrlIndex}`)
  );
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
    const urlChosen = chooseUrlVariant(
      request,
      (await fetchUrlVariants()).variants
    );

    const response = ModifyResponse.modifyResponse(await fetch(urlChosen));
    setCookieInResponse(response);

    return response;
  } catch (e) {
    console.log(`Exception ${e}`);
    return new Response("Internal Server Error", { status: 500 });
  }
}
