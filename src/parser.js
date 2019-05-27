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
      $.SUBRULE($.expressionStatement, left)
    })

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
          $.SUBRULE($.unaryExpression, right)
        }}
      ])
    })

    $.RULE("primaryExpression", () => {
      $.OR([
        { ALT: () => $.CONSUME(t.Identifier, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.StringLiteral, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.NumberLiteral, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.True, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.False, { LABEL: "literal" }) },
        { ALT: () => $.CONSUME(t.Null, { LABEL: "literal "}) }
      ])
    })

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