const { inspect } = require('util')
const generate = require("./lib/helpers")
const BasePRTVisitor = require("./BaseVisitor").BaseVisitor

class ASTVisitor extends BasePRTVisitor {
  constructor() {
    super()
    this.validateVisitor()
    this.string = "";
  }

  program(ctx) {
    const program = ctx.functionDeclaration.map(declaration => this.visit(declaration))
      .reduce((acc, { identifier, parameters, body }) => {
        acc[identifier] = acc[identifier] ? acc[identifier] : []
        acc[identifier].push({parameters, body})
        return acc
      }, {})

    console.log(inspect(program, false, null, true))
  }

  functionDeclaration(ctx) {
    const identifier = ctx.Identifier[0].image
    const parameters = this.$getParameters(ctx.parameterList)
    const body = this.visit(ctx.sourceElements)

    return {
      identifier,
      parameters,
      body
    }
  }

  functionCall(ctx) { 
    const identifier = ctx.Identifier[0].image 
    const body = this.visit(ctx.expressionStatement)

    return `${identifier}(${body})`
  }

  parameterList(ctx) { 
    return {
      type: ctx.literal[0].tokenType.tokenName,
      image: ctx.literal[0].image
    }
  }

  expressionStatement(ctx)  { return this.visit(ctx.left) }
  assignmentExpression(ctx) { return this.visit(ctx.left) }
  additionExpression(ctx) { 
    let right = ""
    const left = this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        right += ctx.operator[0].image
        const rightNode = ctx.right[i];
        right += this.visit(rightNode)
      }
    }

    return left + right
  }

  multiplicationExpression(ctx) { 
    let right = ""
    const left = this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        right += ctx.operator[0].image
        const rightNode = ctx.right[i];
        right += this.visit(rightNode)
      }
    }

    return left + right
  }

  equalityExpression(ctx) {
    let right = ""
    const left = this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        right += ctx.operator[0].image
        const rightNode = ctx.right[i];
        right += this.visit(rightNode)
      }
    }

    return left + right
  }

  unaryExpression(ctx) { 
    let right = ""
    const left = this.visit(ctx.left)

    if(ctx.right) {
      for (let i = 0; i < ctx.right.length; i++) {
        right += ctx.operator[0].image
        const rightNode = ctx.right[i];
        right += this.visit(rightNode)
      }
    }

    return left + right
  }

  primaryExpression(ctx) { 
    if(ctx.parenthesis){
      return this.visit(ctx.parenthesis)
    }
    if(ctx.functionCall){
      return this.visit(ctx.functionCall)
    }
    if(ctx.literal){
      return ctx.literal[0].image
    }
  }

  parenthesisExpression(ctx) { 
    const body = this.visit(ctx.expressionStatement)
    return `(${body})`
  }

  sourceElements(ctx) { 
    return ctx.statement ? this.visit(ctx.statement) : null
  }
  statement(ctx) { 
    return this.visit(ctx.returnStatement) 
  }

  returnStatement(ctx) { 
    const body = this.visit(ctx.expressionStatement)
    return `${body}\n`
  }
}

module.exports = {
  ASTVisitor
}
