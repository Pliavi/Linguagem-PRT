"use strict"
const { Parser } = require("chevrotain")
const { tokenVocabulary, lex } = require("./tokens")

class PRTParser extends Parser {
  constructor(config) {
    super(tokenVocabulary, config)
    const $ = this
    const t = tokenVocabulary

    $.RULE("program", () => {
      $.SUBRULE($.expression)
    })

    $.RULE("functionDefinition", () => {
      $.CONSUME(t.LParens)
      $.OPTION(() => {
        $.SUBRULE($.parameterList)
      })
      $.CONSUME(t.RParens)
      $.CONSUME(t.FatArrow)
      $.SUBRULE($.expression)
    })

    $.RULE("parameterList", () => {
      $.SUBRULE($.value)
      $.MANY(() => {
        $.CONSUME(t.Comma)
        $.SUBRULE2($.value)
      })
    })

    $.RULE("assignExpression", () => {
      $.CONSUME(t.Identifier)
      $.CONSUME(t.Equal)
      $.SUBRULE($.expression)
    })

    $.RULE("additionExpression", () => {
      $.SUBRULE($.multiplicationExpression, {LABEL: 'left'})
      $.MANY(() => {
        $.CONSUME(AdditionOperator)
        $.SUBRULE2($.multiplicationExpression, { LABEL: "right" })
      })
    })

    $.RULE("multiplicationExpression", () => {
      $.MANY(() => {
        $.CONSUME(MultiplicationOperator)
        $.SUBRULE($.atomicExpression, { LABEL: "right" })
      })
    })

    $.RULE("parenthesisExpression", () => {
      $.CONSUME(LParen)
      $.SUBRULE($.expression)
      $.CONSUME(RParen)
    })

    $.RULE("powerFunction", () => {
      $.CONSUME(PowerFunc)
      $.CONSUME(LParen)
      $.SUBRULE($.expression, { LABEL: "base" })
      $.CONSUME(Comma)
      $.SUBRULE2($.expression, { LABEL: "exponent" })
      $.CONSUME(RParen)
    })

    $.RULE("expression", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.assignExpression) },
        { ALT: () => $.SUBRULE($.multiplicationExpression) },
        { ALT: () => $.SUBRULE($.additionExpression) },
        { ALT: () => $.SUBRULE($.functionDefinition) },
        { ALT: () => $.SUBRULE($.value) },
      ])
    })

    $.RULE("value", () => {
      $.OR([
        { ALT: () => $.CONSUME(t.Identifier) },
        { ALT: () => $.CONSUME(t.StringLiteral) },
        { ALT: () => $.CONSUME(t.NumberLiteral) },
        { ALT: () => $.CONSUME(t.True) },
        { ALT: () => $.CONSUME(t.False) },
        { ALT: () => $.CONSUME(t.Null) }
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