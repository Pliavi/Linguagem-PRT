const { parserInstance } = require("./parser")
const BasePRTVisitor = parserInstance.getBaseCstVisitorConstructorWithDefaults()

class ASTVisitor extends BasePRTVisitor {
  constructor() {
    super()
    this.validateVisitor()
  }

  program(ctx) {
    return this.visit(ctx.functionDeclaration)
  }

  functionDeclaration(ctx) {
    let parameters = [] 
    if(undefined !== ctx.parameters){
      parameters.push(ctx.parameters.map(this.visit))
    }
    this.visit(ctx.sourceElements)
    
    return {
      function: ctx.Identifier,
      parameters
    }
  }
  functionCall(ctx) { return ctx }
  parameterList(ctx) { return ctx }
  expressionStatement(ctx) { return ctx }
  assignmentExpression(ctx) { return ctx }
  additionExpression(ctx) { return ctx }
  multiplicationExpression(ctx) { return ctx }
  equalityExpression(ctx) { return ctx }
  unaryExpression(ctx) { return ctx }
  primaryExpression(ctx) { return ctx }
  parenthesisExpression(ctx) { return ctx }
  sourceElements(ctx) { return ctx }
  statement(ctx) { return ctx }
  returnStatement(ctx) { return ctx }
}

module.exports = {
  ASTVisitor
}