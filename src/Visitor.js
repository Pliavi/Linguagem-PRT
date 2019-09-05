import BaseVisitor from "./BaseVisitor";

export default class Visitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
    this.functions = {};
    this.deep = 0;
  }

  program(ctx) {
    const moduleName = this.getImage(ctx.moduleName);
    this.visitAll(ctx.declaration);

    return this.generate(moduleName, this.functions);
  }

  declaration(ctx) {
    const functionName = this.getImage(ctx.functionName);
    const params = this.visitAll(ctx.params).map((param, id) => ({
      ...param,
      id
    }));
    const body = this.visit(ctx.body);
    const arity = params.length;

    this.createOrPush(this.functions, functionName, {
      identifier: `${functionName}`,
      arity,
      params,
      body
    });
  }

  expression(ctx) {
    const left = this.visit(ctx.left).image; // value

    if (ctx.right) {
      const right = this.visit(ctx.right); // mathExpression

      return left + right;
    }

    return left;
  }

  mathExpression(ctx) {
    const operator = this.visit(ctx.operator); // binaryOperator
    const expression = this.visit(ctx.right);

    return operator + expression;
  }

  binaryOperator(ctx) {
    return this.getImage(ctx.operator);
  }

  value(ctx, params = {}) {
    if (ctx.functionCall) {
      return {
        type: "function",
        image: this.visit(ctx.functionCall)
      };
    }

    if (ctx.NUMBER_LITERAL) {
      return {
        type: "number",
        image: this.getImage(ctx.NUMBER_LITERAL)
      };
    }

    if (ctx.STRING_LITERAL) {
      return {
        type: "string",
        image: this.getImage(ctx.STRING_LITERAL)
      };
    }

    if (ctx.TRUE) {
      return {
        type: "boolean",
        image: "true"
      };
    }

    if (ctx.FALSE) {
      return {
        type: "boolean",
        image: "false"
      };
    }

    if (ctx.NULL) {
      return {
        type: "null",
        image: "null"
      };
    }

    if (ctx.IDENTIFIER) {
      return {
        type: "identifier",
        image: this.getImage(ctx.IDENTIFIER)
      };
    }
  }

  functionCall(ctx) {
    const functionName = this.getImage(ctx.IDENTIFIER);
    const functionArguments = this.visitAll(ctx.functionArguments);

    return `${functionName}(${functionArguments})`;
  }
}
