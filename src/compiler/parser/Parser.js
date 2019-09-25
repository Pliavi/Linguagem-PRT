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
  MODULE,
  ALL_TOKENS
} from "../../lib/Tokens";

export default class PRTParser extends CstParser {
  constructor(input) {
    super(ALL_TOKENS);
    const $ = this;

    $.RULE("program", () => {
      $.CONSUME(MODULE);
      $.CONSUME(IDENTIFIER, { LABEL: "moduleName" });
      $.MANY(() => {
        $.SUBRULE($.declaration);
      });
    });

    $.RULE("declaration", () => {
      $.CONSUME(IDENTIFIER, { LABEL: "functionName" });
      $.CONSUME(L_PAREN);
      $.MANY_SEP({
        SEP: COMMA,
        DEF: () => {
          $.SUBRULE($.value, { ARGS: [true], LABEL: "params" });
        }
      });
      $.CONSUME(R_PAREN);
      $.CONSUME(RETURN_WORD);
      $.SUBRULE($.expression, { LABEL: "body" });
    });

    $.RULE("expression", () => {
      $.SUBRULE($.value, { LABEL: "left" });
      $.OPTION(() => {
        $.SUBRULE($.mathExpression, { LABEL: "right" });
      });
    });

    $.RULE("mathExpression", () => {
      $.SUBRULE($.binaryOperator, { LABEL: "operator" });
      $.SUBRULE($.expression, { LABEL: "right" });
    });

    $.RULE("value", (isFunctionPermited = false) => {
      $.OR([
        {
          GATE: isFunctionPermited,
          ALT: () => {
            $.SUBRULE($.functionCall);
          }
        },
        {
          ALT: () => {
            $.CONSUME(NUMBER_LITERAL);
          }
        },
        {
          ALT: () => {
            $.CONSUME(STRING_LITERAL);
          }
        },
        {
          ALT: () => {
            $.CONSUME(TRUE);
          }
        },
        {
          ALT: () => {
            $.CONSUME(FALSE);
          }
        },
        {
          ALT: () => {
            $.CONSUME(NULL);
          }
        },
        {
          ALT: () => {
            $.CONSUME2(IDENTIFIER);
          }
        }
      ]);
    });

    $.RULE("binaryOperator", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(ADDITIVE_OPERATOR, { LABEL: "operator" });
          }
        },
        {
          ALT: () => {
            $.CONSUME(MULTIPLICATIVE_OPERATOR, { LABEL: "operator" });
          }
        }
      ]);
    });

    $.RULE("functionCall", () => {
      $.CONSUME(IDENTIFIER);
      $.CONSUME(L_PAREN);
      $.MANY_SEP({
        SEP: COMMA,
        DEF: () => {
          $.SUBRULE($.expression, { LABEL: "functionArguments" });
        }
      });
      $.CONSUME(R_PAREN);
    });

    this.performSelfAnalysis();
    if (input) {
      this.input = input;
    }
  }
}
