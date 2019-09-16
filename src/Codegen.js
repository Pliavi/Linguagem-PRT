import Helper from "./lib/helper";

const exports = [];

export function generate(module, functions = [], imports = []) {
  const importsString = addImports(imports);
  const functionsString = addFunctions(functions);
  const exportsString = Helper.arrayToObjectString(exports);

  return `
    ${importsString}
    window.PRT.${module} = (function () {
      ${functionsString}
      return ${exportsString}
    })()
    
    if(window.PRT.${module}.hasOwnProperty("principal")){
      window.PRT.${module}.principal()
    }
  `;
}

function addImports(imports) {
  // @TODO: Verificar a ENV se é browser ou node antes de executar essa parte
  return imports.map(module => `import ${module};`).join("");
}

function addFunctions(functions) {
  let functionsString = "";
  const nameParams = params => {
    const createLabel = ({ image }, id) => `const ${image} = params[${id}];`;
    const nonIdentifiers = param => param.type === "identifier";

    return params
      .filter(nonIdentifiers)
      .map(createLabel)
      .join("");
  };

  const addPatternMatching = (functionName, arity, params) => {
    const onlyConstants = param => param.type !== "identifier";
    const createMatching = ({ id, image }) => `arguments[${id}] == ${image}`;

    let patternMatching = params
      .filter(onlyConstants)
      .map(createMatching)
      .join("&&");

    patternMatching = patternMatching && "&& " + patternMatching;

    return `
      if(arguments.length == ${arity} ${patternMatching}){
        return ${functionName}(arguments);
      }
    `;
  };

  const addFunctionByArity = (func, id) => {
    func.name = `$_${func.identifier}${id}`;

    return `
    function ${func.name}(params) {
      ${nameParams(func.params)}
      return ${func.body};
    }

    ${addPatternMatching(func.name, func.arity, func.params)}`;
  };

  for (const functionName in functions) {
    if (functions.hasOwnProperty(functionName)) {
      exports.push(functionName);
      const functionArities = functions[functionName];
      functionsString += `
        function ${functionName}() {
          ${functionArities.map(addFunctionByArity).join("")}
        
        throw \`(Função ${functionName}/\${arguments.length} inexistente): 
        A aridade \${arguments.length} da função ${functionName} não existe\`}`;
    }
  }

  return functionsString;
}
