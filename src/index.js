const { parse } = require("./parser")
const { inspect } = require('util')
const { ASTVisitor } = require("./ASTVisitor")

let input = `
função fatorial(n) retorna n * fatorial(n-1)
função fatorial(1) 
    retorna 1

função iniciar() retorna fatorial(5)
`

let parsedInput = parse(input);
// parsedInput = parse(`função fatorial(n) retorna n * fatorial(n-1)`);

if(parsedInput.lexErrors.length > 0) {
    console.log(inspect(parsedInput.lexErrors, false, null, true))
} else if(parsedInput.parseErrors.length > 0) {
    console.log(inspect(parsedInput.parseErrors, false, null, true))
} else {
    const cst = parsedInput.cst;
    const ast = new ASTVisitor()
    ast.visit(cst)
    console.log("INPUT ->")
    console.log(input.trim())
    console.log("\nPARSED ->")
    console.log(ast.string)
}
