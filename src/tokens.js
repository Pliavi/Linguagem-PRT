"use strict"
const { Lexer, createToken } = require("chevrotain")

const True = createToken({ 
    name: "True", 
    pattern: /verdadeiro/ 
})
const False = createToken({ 
    name: "False", 
    pattern: /falso/ 
})

const Identifier = createToken({
    name: "Identifier", 
    pattern: /[a-zA-z_]\w*/ 
})

const Null = createToken({ 
    name: "Null", 
    pattern: /nulo/ 
})

const LCurly = createToken({ name: "LCurly", pattern: /{/ })
const RCurly = createToken({ name: "RCurly", pattern: /}/ })
const LSquare = createToken({ name: "LSquare", pattern: /\[/ })
const RSquare = createToken({ name: "RSquare", pattern: /]/ })
const LParen = createToken({ name: "LParen", pattern: /\(/ })
const RParen = createToken({ name: "RParen", pattern: /\)/ })
const Comma = createToken({ name: "Comma", pattern: /,/ })
const Colon = createToken({ name: "Colon", pattern: /:/ })

const StringLiteral = createToken({
    name: "StringLiteral",
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
})

const NumberLiteral = createToken({
    name: "NumberLiteral",
    pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
})

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /[ \t\n\r]+/,
    // ignore whitespace
    group: Lexer.SKIPPED
})

const UnaryOperator = createToken({ name: "UnaryOperator", pattern: Lexer.NA })
const ReturnToken = createToken({ name: "ReturnToken", pattern: /retorna/})

const AdditiveOperator = createToken({ name: "AdditiveOperator", categories: UnaryOperator, pattern: Lexer.NA })
const Plus = createToken({ name: "Plus", pattern: /-/ , categories: AdditiveOperator})
const Minus = createToken({ name: "Minus", pattern: /\+/ , categories: AdditiveOperator})

const MultiplicativeOperator = createToken({ name: "MultiplicativeOperator", pattern: Lexer.NA })
const Asterisk = createToken({ name: "Asterisk", pattern: /\*/ , categories: MultiplicativeOperator})
const Slash = createToken({ name: "Slash", pattern: /\// , categories: MultiplicativeOperator})

const EqualityOperator = createToken({ name: "EqualityOperator", pattern: Lexer.NA })
const Equal = createToken({ name: "Equal", pattern: /=/, categories: EqualityOperator })

const FatArrow = createToken({ name: "FatArrow", pattern: /=>/ })

const FunctionToken = createToken({name: "FunctionToken", pattern: /função/})

const tokensDefinition = {
    ReturnToken,
    FunctionToken,
    EqualityOperator,
    UnaryOperator,
    FatArrow,
    AdditiveOperator,
    MultiplicativeOperator,
    Plus,
    Minus,
    Asterisk,
    Slash,
    WhiteSpace,
    NumberLiteral,
    StringLiteral,
    Equal,
    LCurly,
    RCurly,
    LSquare,
    RSquare,
    LParen,
    RParen,
    Comma,
    Colon,
    True,
    False,
    Null,
    Identifier
}

const PRTLexer = new Lexer(Object.values(tokensDefinition))

const tokenVocabulary = tokensDefinition;
//const tokenVocabulary = {}
//tokensDefinition.forEach(tokenType => {
//    tokenVocabulary[tokenType.name] = tokenType
//})

module.exports = { 
    tokenVocabulary,
    lex: function(inputText) {
        const lexingResult = PRTLexer.tokenize(inputText)

        if (lexingResult.errors.length > 0) {
            //throw Error("lexing errors detected")
        }

        return lexingResult
    }
}
