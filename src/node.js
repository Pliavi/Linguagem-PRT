import { inspect } from "util";
import { ALL_TOKENS } from "../lib/Tokens";
import { Lexer as PRTLexer } from "chevrotain";
import PRTParser from "./parser/Parser";
import generateDiagram from "../lib/generateDiagram";
import Visitor from "./parser/Visitor";
import * as fs from "fs";

const example = `
modulo Matematico
  identidade(n) retorna n

  multiplicar(x, y) retorna x * y

  fatorial(1) retorna identidade(1)
  fatorial(n) retorna multiplicar(n, fatorial(n - 1))

  principal() retorna fatorial(5)
`;

function parseCode(code) {
  const lexer = new PRTLexer(ALL_TOKENS);
  const lexemes = lexer.tokenize(code);
  const parser = new PRTParser(lexemes.tokens);
  const visitor = new Visitor();

  const cst = parser.program();

  if (lexemes.errors.length > 0) {
    return inspect(lexemes.errors, false, null, true);
  }

  if (parser.errors.length > 0) {
    return inspect(parser.errors, false, null, true);
  }

  const result = visitor.visit(cst);

  fs.writeFile("dist/compiled.js", result, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });

  // return inspect(result, false, null, true);
}

generateDiagram();
parseCode(example);
