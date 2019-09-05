import Parser from "./Parser";

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

  check_result() {
    /*
      * $params is always a list
      function $functionName($params) {
        return #arityAndPatternMatchingIfs

        #Functions
      }
    */

    function fatorial(params) {
      const fatorial_0 = params => {
        return 1;
      };

      const fatorial_1 = params => {
        return params[0] * fatorial([params[0] - 1]);
      };

      if (params.length == 1 && params[0] == 1) {
        return fatorial_0(params);
      }

      if (params.length == 1) {
        return fatorial_1(params);
      }
    }
  }

  generateFunctionMatching(functionNameWithId, arity, params) {
    const onlyConstants = param => param.type !== "identifier";
    const createMatching = ({ id, image }) => `arguments[${id}] == ${image}`;

    let patternMatching = params
      .filter(onlyConstants)
      .map(createMatching)
      .join("&&");

    patternMatching = patternMatching && "&& " + patternMatching;

    return `
      if(arguments.length == ${arity} ${patternMatching}){
        return ${functionNameWithId}(arguments);
      }
    `;
  }

  generateFunctionBody(functionNameWithId, params, body) {
    const onlyLabels = param => param.type === "identifier";
    const createLabel = ({ image }, id) => `const ${image} = params[${id}];`;

    const renderLabels = params => {
      return params
        .filter(onlyLabels)
        .map(createLabel)
        .join("");
    };

    return `
      function ${functionNameWithId}(params) {
        ${renderLabels(params)}
        return ${body};
      }
    `;
  }

  // generateFunctionArity()()

  generate(moduleName, functions) {
    let exportedFunctions = [];
    let code = `function ${moduleName}() {\n`;

    for (const functionName in functions) {
      exportedFunctions.push(functionName);
      code += `function ${functionName}() {`;
      if (functions.hasOwnProperty(functionName)) {
        const functionArities = functions[functionName];

        code += functionArities
          .map(({ identifier, arity, params, body }, id) => {
            const functionNameWithId = identifier + id;
            let partial = "";

            partial += this.generateFunctionBody(
              functionNameWithId,
              params,
              body
            );

            partial += this.generateFunctionMatching(
              functionNameWithId,
              arity,
              params
            );

            return partial;
          })
          .join("");
      }
      code += "};";
    }

    // code += `
    //   return principal()}
    // `;
    code += `
    return {${exportedFunctions.join(",")}}
    `;
    return code + "}";
  }
}
