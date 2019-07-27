import { inspect } from "util";
import { ALL_TOKENS } from "./Tokens";
import { Lexer as PRTLexer, resolveGrammar, assignOccurrenceIndices } from "chevrotain";
import PRTParser from "./Parser";
import generateDiagram from "./lib/generateDiagram";
import Visitor from "./Visitor";
import * as babel from "@babel/core";

const example = `
fatorial(1) retorna 1
fatorial(n) retorna n * fatorial(n-1)
`;

function parseCode(code) {
  const lexer = new PRTLexer(ALL_TOKENS);
  const lexemes = lexer.tokenize(code);
  const parser = new PRTParser(lexemes.tokens);
  const visitor = new Visitor();

  const cst = parser.program();

  if (lexemes.errors.length > 0)
    return inspect(lexemes.errors, false, null, true);

  if (parser.errors.length > 0)
    return inspect(parser.errors, false, null, true);

  return inspect(visitor.visit(cst), false, null, true);
}

generateDiagram();
console.log(parseCode(example));