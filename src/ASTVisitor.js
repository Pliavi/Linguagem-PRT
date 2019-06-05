const { parserInstance } = require("./parser")
const BasePRTVisitor = parserInstance.getBaseCstVisitorConstructorWithDefaults()

class ASTVisitor extends BasePRTVisitor {
  constructor() {
    super()
    this.validateVisitor()
    this.string = "";
  }

  program(ctx) {
    ctx.functionDeclaration
      .forEach(dec => this.visit(dec))
  }

  functionDeclaration(ctx) {
    this.string += `const ${ctx.Identifier[0].image} = (`

    if(ctx.parameterList) {
      const parameters = ctx.parameterList
        .map(parameter => this.visit(parameter))

      this.string += parameters.join(",")
    }

    this.string += ") => "

    this.visit(ctx.sourceElements)
  }

  functionCall(ctx) { 
    this.string += ctx.Identifier[0].image + "(" 
    this.visit(ctx.expressionStatement)
    this.string += ")"
  }

  parameterList(ctx) { return ctx.literal[0].image }

  expressionStatement(ctx) { this.visit(ctx.left) }
  assignmentExpression(ctx) { this.visit(ctx.left) }

  additionExpression(ctx) { 
    this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        this.string += ctx.operator[0].image
        const right = ctx.right[i];
        this.visit(right)
      }
    }
  }

  multiplicationExpression(ctx) { 
    this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        this.string += ctx.operator[0].image
        const right = ctx.right[i];
        this.visit(right)
      }
    }
  }

  equalityExpression(ctx) {
    this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        this.string += ctx.operator[0].image
        const right = ctx.right[i];
        this.visit(right)
      }
    }
  }

  unaryExpression(ctx) { 
    this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        this.string += ctx.operator[0].image
        const right = ctx.right[i];
        this.visit(right)
      }
    }
  }

  primaryExpression(ctx) { 
    if(ctx.parenthesis){
      this.visit(ctx.parenthesis)
    }
    if(ctx.functionCall){
      this.visit(ctx.functionCall)
    }
    if(ctx.literal){
      this.string += ctx.literal[0].image
    }
  }

  parenthesisExpression(ctx) { 
    this.string += "("
    this.visit(ctx.expressionStatement)
    this.string += ")"
  }

  sourceElements(ctx) { 
    // if(ctx.functionDeclaration) { this.visit(ctx.functionDeclaration) }
    if(ctx.statement) { this.visit(ctx.statement) }
  }
  statement(ctx) { this.visit(ctx.returnStatement) }
  returnStatement(ctx) { 
    this.visit(ctx.expressionStatement)
    this.string += "\n"
  }
}

module.exports = {
  ASTVisitor
}
