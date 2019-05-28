const { parse } = require("./parser")
const { inspect } = require('util')
const { myCustomVisitorWithDefaults } = require("./codegen")

let cst = parse(`
função fatorial(n) retorna n * fatorial(n-1)
função fatorial(1) 
    retorna 1
`)

cst = parse(`
função fatorial(n) retorna n * fatorial(n-1)
`)

if(cst.lexErrors.length > 0) {
    console.log(inspect(cst.lexErrors, false, null, true))
} else if(cst.parseErrors.length > 0) {
    console.log(inspect(cst.parseErrors, false, null, true))
} else {
    console.log(inspect(cst, false, null, true))
    // const ast = new myCustomVisitorWithDefaults()
    // console.log(inspect(ast.visit(cst.cst), false, null, true))
}
