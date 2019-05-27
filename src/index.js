const { parse } = require("./parser")
const { inspect } = require('util')
const { myCustomVisitorWithDefaults } = require("./codegen")

const cst = parse("abap=2+2*7")

if(cst.lexErrors.length > 0) {
    console.log(inspect(cst.parseErrors, false, null, true))
} else if(cst.parseErrors.length > 0) {
    console.log(inspect(cst.parseErrors, false, null, true))
} else {
    console.log(inspect(cst, false, null, true))
    // const ast = new myCustomVisitorWithDefaults()
    // console.log(inspect(ast.visit(cst.cst), false, null, true))
}
