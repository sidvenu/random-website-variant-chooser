export default class ModifyResponse {
  /**
   * Modify the response with HTMLRewriter to include details about
   * Show Off Open Source
   * @param {Response} response
   */
  static modifyResponse(response) {
    return new HTMLRewriter().on("*", new ElementHandler()).transform(response);
  }
}

class ElementHandler {
  /**
   *
   * @param {HTMLElement} element
   */
  element(element) {
    switch (element.tagName.toUpperCase()) {
      case "TITLE": {
        element.setInnerContent("Show Off Open Source");
        break;
      }
      case "H1": {
        if (element.getAttribute("id") === "title") {
          element.append(": Contribute to Show Off Open Source");
        }
        break;
      }
      case "P": {
        if (element.getAttribute("id") === "description") {
          element.setInnerContent(`Bored of the lockdown? Want to help an open source organisation?
          Head to Show Off Open Source. We are commited
          to building templates for people to use easily in making their personal portfolio
          websites.`);
        }
        break;
      }
      case "A": {
        if (element.getAttribute("id") === "url") {
          element.setAttribute("href", "https://github.com/show-off/");
          element.setAttribute("target", "_blank");
          element.setInnerContent("Here we go!");
        }
        break;
      }
    }
  }
}
