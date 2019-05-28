"use strict"
const { Parser } = require("chevrotain")
const { tokenVocabulary, lex } = require("./tokens")

const left = { LABEL: "left" }
const right = { LABEL: "right" }

class PRTParser extends Parser {
  constructor(config) {
    super(tokenVocabulary, config)
    const $ = this
    const t = tokenVocabulary

    $.RULE("program", () => {
      $.AT_LEAST_ONE(()=> {
        $.SUBRULE($.functionDeclaration)
      })
    })

    // Start: Functions
    $.RULE("functionDeclaration", () => {
      $.CONSUME(t.FunctionToken)
      $.CONSUME(t.Identifier)
      $.CONSUME(t.LParen)
      $.MANY_SEP({
        SEP: t.Comma,
        DEF: () => {$.SUBRULE($.parameterList)}
      })
      $.CONSUME(t.RParen)
      $.SUBRULE($.sourceElements)
    })

    $.RULE("functionCall", () => {
      $.CONSUME(t.Identifier)
      $.CONSUME(t.LParen)
      $.SUBRULE($.expressionStatement)
      $.CONSUME(t.RParen)
    })

    $.RULE("parameterList", () => {
      $.OR([
        { ALT: () => $.CONSUME(t.Identifier, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.StringLiteral, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.NumberLiteral, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.True, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.False, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.Null, { LABEL: "literal "}) }
      ])
    })
    // End: Functions
    
    // Start: Expressions
    $.RULE("expressionStatement", () => {
      $.SUBRULE($.assignmentExpression, left)
    })

    $.RULE("assignmentExpression", () => {
      $.SUBRULE($.additionExpression, left)
    })

    $.RULE("additionExpression", () => {
      $.SUBRULE1($.multiplicationExpression, left)
      $.MANY(() => {
        $.CONSUME(t.AdditiveOperator, {LABEL: "operator"})
        $.SUBRULE2($.multiplicationExpression, right)
      })
    })

    $.RULE("multiplicationExpression", () => {
      $.SUBRULE1($.equalityExpression, left)
      $.MANY(() => {
        $.CONSUME(t.MultiplicativeOperator, {LABEL: "operator"})
        $.SUBRULE2($.equalityExpression, right)
      })
    })

    $.RULE("equalityExpression", () => {
      $.SUBRULE1($.unaryExpression, left)
      $.MANY(() => {
        $.CONSUME(t.EqualityOperator)
        $.SUBRULE2($.unaryExpression, right)
      })
    })

    $.RULE('unaryExpression', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.primaryExpression, left) },
        { ALT: () => {
          $.CONSUME(t.UnaryOperator)
          $.SUBRULE2($.unaryExpression, right)
        }}
      ])
    })

    $.RULE("primaryExpression", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.functionCall, {LABEL: "functionCall"})},
        { ALT: () => $.CONSUME(t.Identifier, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.StringLiteral, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.NumberLiteral, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.True, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.False, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.Null, { LABEL: "literal "}) },
        { ALT: () => $.SUBRULE($.parenthesisExpression, {LABEL: "literal"})},
      ])
    })

    $.RULE("parenthesisExpression", () => {
      $.CONSUME(t.LParen)
      $.SUBRULE($.expressionStatement)
      $.CONSUME(t.RParen)
    })
    // End: Expressions

    $.RULE("sourceElements", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.functionDeclaration) },
          { ALT: () => $.SUBRULE($.statement) }
        ])
      })
    })

    // Start: Statements
    $.RULE("statement", () => {
      $.SUBRULE($.returnStatement)
    })

    $.RULE("returnStatement", () => {
      $.CONSUME(t.ReturnToken)
      $.SUBRULE($.expressionStatement)
    })
    // End: Statements

    this.performSelfAnalysis();
  }
}

const parser = new PRTParser()

function parse(text) {
  // Cria os tokens
  const lexResult = lex(text)

  // Injeta os tokens encontrados no parser
  parser.input = lexResult.tokens

  // Inicia a leitura do parser pela regra PROGRAM
  const cst = parser.program()

  return {
    cst: cst,
    lexErrors: lexResult.errors,
    parseErrors: parser.errors
  }
}

module.exports = { parse, parserInstance: parser }