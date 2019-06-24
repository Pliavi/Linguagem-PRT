import { CstParser, IToken } from "chevrotain";
import {
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
  EQUAL,
  FAT_ARROW,
  FUNCTION_WORD,
  RETURN_WORD,
  WHITE_SPACE,
  IDENTIFIER,
  ALL_TOKENS
} from "./Tokens";

export default class PRTParser extends CstParser {
  constructor(lexemes: IToken[] = []) {
    super(ALL_TOKENS);
    this.performSelfAnalysis();
    if(lexemes) {
      this.input = lexemes;
    }
  }

  public program = this.RULE("program", () => {
    this.MANY(() => {
      this.SUBRULE(this.function);
    });
  });

  private function = this.RULE("function", () => {
    this.CONSUME(IDENTIFIER);
    this.CONSUME(L_PAREN);
    this.MANY_SEP({
      SEP: COMMA,
      DEF: () => {
        this.SUBRULE(this.value, { ARGS: [true] });
      }
    });
    this.CONSUME(R_PAREN);
    this.CONSUME(RETURN_WORD);
    this.SUBRULE(this.expression);
  });

  private expression = this.RULE("expression", () => {
    this.SUBRULE(this.value);
    this.OPTION(() => {
      this.SUBRULE(this.mathExpression);
    });
  });

  private mathExpression = this.RULE("mathExpression", () => {
    this.SUBRULE(this.binaryOperator);
    this.SUBRULE(this.expression);
  });

  private value = this.RULE("value", (isFunctionPermited = false) => {
    this.OR([
      {
        GATE: isFunctionPermited,
        ALT: () => {
          this.SUBRULE(this.functionCall);
        }
      },
      {
        ALT: () => {
          this.CONSUME(NUMBER_LITERAL);
        }
      },
      {
        ALT: () => {
          this.CONSUME(STRING_LITERAL);
        }
      },
      {
        ALT: () => {
          this.CONSUME(TRUE);
        }
      },
      {
        ALT: () => {
          this.CONSUME(FALSE);
        }
      },
      {
        ALT: () => {
          this.CONSUME(NULL);
        }
      },
      {
        ALT: () => {
          this.CONSUME2(IDENTIFIER);
        }
      }
    ]);
  });

  private binaryOperator = this.RULE("binaryOperator", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(ADDITIVE_OPERATOR);
        }
      },
      {
        ALT: () => {
          this.CONSUME(MULTIPLICATIVE_OPERATOR);
        }
      }
    ]);
  });

  private functionCall = this.RULE("functionCall", () => {
    this.CONSUME(IDENTIFIER);
    this.CONSUME(L_PAREN);
    this.MANY_SEP({
      SEP: COMMA,
      DEF: () => {
        // console.log(this.LA(2));
        this.SUBRULE(this.expression);
      }
    });
    this.CONSUME(R_PAREN);
  });
}
