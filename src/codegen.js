const { parserInstance } = require("./parser")

// const BasePRTVisitor = parserInstance.getBaseCstVisitorConstructor()

// This BaseVisitor include default visit methods that simply traverse the CST.
const BasePRTVisitorWithDefaults = parserInstance.getBaseCstVisitorConstructorWithDefaults()

// class myCustomVisitor extends BasePRTVisitor {
//     constructor() {
//         super()
//         // The "validateVisitor" method is a helper utility which performs static analysis
//         // to detect missing or redundant visitor methods
//         this.validateVisitor()
//     }

//     /* Visit methods go here */
// }

class myCustomVisitorWithDefaults extends BasePRTVisitorWithDefaults {
    constructor() {
        super()
        this.validateVisitor()
    }

    program(ctx) {
      return this.visit(ctx.left)
    }

    expressionStatement(ctx) {
      return this.visit(ctx.left)
    }

    assignmentExpression(ctx) {
      return this.visit(ctx.left)
    }
    
    additionExpression(ctx) {
      const left = Number.parseInt(this.visit(ctx.left))
      const right = Number.parseInt(this.visit(ctx.right))
      if(ctx.operator && ctx.operator[0].image == "+") {
        return left + right
      }
      return left - right
    }
    
    multiplicationExpression(ctx){
      const left = Number.parseInt(this.visit(ctx.left))
      const right = Number.parseInt(this.visit(ctx.right))
      if(ctx.operator && ctx.operator[0].image == "*") {
        return left * right
      }
      return left / right
    }
    
    equalityExpression(ctx) {
      const left = this.visit(ctx.left)
      const right = this.visit(ctx.right)
      console.log(`${left} = ${right}`)
      return `${left} = ${right}`
    }
    
    unaryExpression(ctx) {
      return this.visit(ctx.left)
    }
    
    primaryExpression(ctx) {
      return ctx.literal[0].image
    }
}

// const myVisitorInstance = new myCustomVisitor()

module.exports = {
  // myVisitorInstance,
  myCustomVisitorWithDefaults
}