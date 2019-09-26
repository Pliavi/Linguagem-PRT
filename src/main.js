import { ALL_TOKENS } from "./compiler/Tokens";
import { Lexer as PRTLexer } from "chevrotain";
import PRTParser from "./compiler/Parser";
import Visitor from "./compiler/Visitor";

window.PRT = {};
window.parseCode = function(code) {
  const lexer = new PRTLexer(ALL_TOKENS);
  const lexemes = lexer.tokenize(code);
  const parser = new PRTParser(lexemes.tokens);
  const visitor = new Visitor();

  const cst = parser.program();

  if (lexemes.errors.length > 0) {
    return new Error(lexemes.errors);
  }

  if (parser.errors.length > 0) {
    return new Error(parser.errors);
  }

  const result = visitor.visit(cst);
  console.log(result);

  return result;
};
