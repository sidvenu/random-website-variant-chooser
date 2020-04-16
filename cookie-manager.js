export default class CookieManager {
  /**
   * Gets the cookie associated with 'cname'
   *
   * @param {string} cname
   * @param {string} cookie
   * @returns {string}
   */
  static getCookie(cname, cookie) {
    if (cookie === null) {
      return "";
    }
    let name = cname + "=";
    let ca = cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
   * Bakes a cookie cname with the value cvalue for exdays
   *
   * @param {string} cname
   * @param {string} cvalue
   * @param {number} exdays
   * @returns {string}
   */
  static bakeCookie(cname, cvalue, exdays = 7) {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    return cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}
