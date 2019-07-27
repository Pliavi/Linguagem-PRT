import { createToken, Lexer } from "chevrotain";

// Words
export const TRUE = createToken({ name: "TRUE", pattern: /verdadeiro/ })
export const FALSE = createToken({ name: "FALSE", pattern: /falso/ })
export const IDENTIFIER = createToken({name: "IDENTIFIER", pattern: /[a-zA-z_]\w*/ })
export const NULL = createToken({ name: "NULL", pattern: /nulo/ })

// Braces
export const L_CURLY = createToken({ name: "L_CURLY", pattern: /{/ })
export const R_CURLY = createToken({ name: "R_CURLY", pattern: /}/ })
export const L_SQUARE = createToken({ name: "L_SQUARE", pattern: /\[/ })
export const R_SQUARE = createToken({ name: "R_SQUARE", pattern: /]/ })
export const L_PAREN = createToken({ name: "L_PAREN", pattern: /\(/ })
export const R_PAREN = createToken({ name: "R_PAREN", pattern: /\)/ })

export const COMMA = createToken({ name: "COMMA", pattern: /,/ })
export const COLON = createToken({ name: "COLON", pattern: /:/ })

// Literals
export const STRING_LITERAL = createToken({ name: "STRING_LITERAL", pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/ })
export const NUMBER_LITERAL = createToken({ name: "NUMBER_LITERAL", pattern: /(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/ })

// Operators
export const UNARY_OPERATOR = createToken({ name: "UNARY_OPERATOR", pattern: Lexer.NA })

export const ADDITIVE_OPERATOR = createToken({ name: "ADDITIVE_OPERATOR", pattern: Lexer.NA })
export const PLUS = createToken({ name: "PLUS", pattern: /\+/ , categories: ADDITIVE_OPERATOR})
export const MINUS = createToken({ name: "MINUS", pattern: /-/ , categories: ADDITIVE_OPERATOR})

export const MULTIPLICATIVE_OPERATOR = createToken({ name: "MULTIPLICATIVE_OPERATOR", pattern: Lexer.NA })
export const ASTERISK = createToken({ name: "ASTERISK", pattern: /\*/ , categories: MULTIPLICATIVE_OPERATOR})
export const SLASH = createToken({ name: "SLASH", pattern: /\// , categories: MULTIPLICATIVE_OPERATOR})

export const EQUALITY_OPERATOR = createToken({ name: "EQUALITY_OPERATOR", pattern: Lexer.NA })
export const EQUAL = createToken({ name: "EQUAL", pattern: /=/, categories: EQUALITY_OPERATOR })

export const FAT_ARROW = createToken({ name: "FAT_ARROW", pattern: /=>/ })

// Reserved words
export const FUNCTION_WORD = createToken({name: "FUNCTION_WORD", pattern: /função/})
export const RETURN_WORD = createToken({ name: "RETURN_WORD", pattern: /retorna/})

// Ignored
export const WHITE_SPACE = createToken({ name: "WHITE_SPACE", pattern: /[ \t\n\r]+/, group: Lexer.SKIPPED })

export const ALL_TOKENS = [
  TRUE,
  FALSE,
  NULL,
  L_CURLY,
  R_CURLY,
  L_SQUARE,
  R_SQUARE,
  L_PAREN,
  R_PAREN,
  COMMA,
  COLON,
  STRING_LITERAL,
  NUMBER_LITERAL,
  UNARY_OPERATOR,
  ADDITIVE_OPERATOR,
  PLUS,
  MINUS,
  MULTIPLICATIVE_OPERATOR,
  ASTERISK,
  SLASH,
  EQUALITY_OPERATOR,
  FAT_ARROW,
  EQUAL,
  FUNCTION_WORD,
  RETURN_WORD,
  IDENTIFIER,
  WHITE_SPACE
]