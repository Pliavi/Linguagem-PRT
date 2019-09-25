import Parser from "../src/parser/Parser";

const parserInstance = new Parser();
const BaseVisitor = parserInstance.getBaseCstVisitorConstructor();

export default class Visitor extends BaseVisitor {
  /**
   * @returns {string}
   */
  getImage(contextNode) {
    return contextNode[0].image;
  }

  /**
   * @return {Array}
   */
  createOrPush(arr, id, value) {
    arr[id] = arr[id] ? arr[id] : [];
    arr[id].push(value);

    return arr;
  }

  /**
   * @return {Array}
   */
  visitAll(contextNode, params = {}) {
    return contextNode ? contextNode.map(node => this.visit(node, params)) : [];
  }
}
