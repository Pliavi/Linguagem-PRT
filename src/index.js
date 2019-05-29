const { parse } = require("./parser")
const { inspect } = require('util')
const { ASTVisitor } = require("./ASTVisitor")

let cst = parse(`
função fatorial(n) retorna n * fatorial(n-1)
função fatorial(1) 
    retorna 1
`)

if(cst.lexErrors.length > 0) {
    console.log(inspect(cst.lexErrors, false, null, true))
} else if(cst.parseErrors.length > 0) {
    console.log(inspect(cst.parseErrors, false, null, true))
} else {
    // console.log(inspect(cst, false, null, true))
    const ast = new ASTVisitor()
    console.log(inspect(ast.visit(cst.program), false, null, true))
}
