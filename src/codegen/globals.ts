import {
  Globals,
  PRTModule,
  Clause,
  ParameterType,
  Caller
} from "src/compiler/types";

export const createGlobal: Function = (module: PRTModule): Globals => ({
  main: module,
  imports: new Map()
});

function extractModule({ main, imports }: Globals, moduleName: string) {
  const isMain = moduleName === null || moduleName === undefined;

  if (isMain) {
    return main;
  }

  if (imports.has(moduleName)) {
    return imports.get(moduleName);
  }

  throw `${moduleName} não existe`;
}

export function callFunction(
  globals: Globals,
  { moduleName, functionName }: Caller,
  args: Array<any>
) {
  let moduleFunctions = extractModule(globals, moduleName).functions;

  if (moduleFunctions.has(functionName)) {
    const functionClauses = moduleFunctions.get(functionName).clauses;
    const arityFilteredClauses = filterByArity(functionClauses, args.length);
    const matchedClause = takeMatchedClause(arityFilteredClauses, args);

    // Actually call the matched function clause with the actual arguments
    return matchedClause.call(args);
  }
}

function filterByArity(clauses: Array<Clause>, arity: number) {
  const functionClauses = clauses.filter(
    clause => arity === clause.paramList.length
  );

  if (functionClauses.length > 0) return functionClauses;

  throw `Aridade não encontrada para a função`;
}

function takeMatchedClause(clauses: Array<Clause>, args: Array<any>) {
  for (const clause of clauses) {
    const matched = clause.paramList.every(
      ({ type, value }, index) =>
        type === ParameterType.Value && value == args[index]
    );

    if (matched) return clause;
  }

  throw `Nenhuma clausula bate com os argumentos: ${args}`;
}
