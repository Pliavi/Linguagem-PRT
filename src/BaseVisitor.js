const { parserInstance } = require("./parser");
const BaseVisitor = parserInstance.getBaseCstVisitorConstructor();

BaseVisitor.prototype.$createProgram = function(funcs) {
  // return Object.keys(funcs).map(identifier => {
  //   funcs[identifier].map({parameters, body} => {
  //     const variableParameters = parameters.filter(parameter => parameter.type == "Identifier")
  //     const matchingParameters = parameters.filter(parameter => parameter.type != "Identifier")

  //     return `
  //       const ${identifier} = (${variableParameters.join(",")}) => {
  //         if()
  //       }
  //     `
  //   })
  // });
};

BaseVisitor.prototype.$createFunction = function(identifier, parameters, body) {
  return `const ${identifier} = (${parameters.join(",")}) => ${body}`;
};

BaseVisitor.prototype.$getParameters = function(parameters) {
  return parameters ? parameters.map(parameter => this.visit(parameter)) : [];
};

module.exports = { BaseVisitor };
