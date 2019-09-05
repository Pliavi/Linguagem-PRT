import { inspect } from "util";
import { ALL_TOKENS } from "./Tokens";
import {
  Lexer as PRTLexer,
  resolveGrammar,
  assignOccurrenceIndices
} from "chevrotain";
import PRTParser from "./Parser";
import generateDiagram from "./lib/generateDiagram";
import Visitor from "./Visitor";
import * as babel from "@babel/core";
import * as fs from "fs";

const example = `
modulo Matematico
  identidade(n) retorna n

  multiplicar(x, y) retorna x * y

  fatorial(1) retorna identidade(1)
  fatorial(n) retorna multiplicar(n, fatorial(n - 1))

  principal() retorna fatorial(5)
`;

//const example = `
//duplicar([]) retorna []
//duplicar(numeros) faz
//  Lista:mapear(numeros, onde numero retorna numero * 2)
//fim
//`;

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

  fs.writeFile("compiled.js", result, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });

  // return inspect(result, false, null, true);
}

generateDiagram();
parseCode(example);
