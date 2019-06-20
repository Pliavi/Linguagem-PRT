function renderProgram(program) {
  for (const funcName in program) {
    if (program.hasOwnProperty(funcName)) {
      const definition = 
        program[funcName]
        .map(funcDefinition => {
          const 
            parametersSet = funcDefinition.parameters,
            bodies = funcDefinition.body

          return renderFunctionDefinition(funcName, {parametersSet, bodies})
        })
    }
  }
}

function renderFunctionDefinition(functionName, {parametersSet, bodies}) {
  /*
    função fatorial(1) retorna 1
    função fatorial(x) retorna x * fatorial(x - 1)
    ---
    function fatorial(parameters) {
      const availableArities = [1] // #{Array:availableArities}
      const arity = parameters.length

      if(!availableArities.includes(arity)){
        throw new Error(
          "(Erro: Função Indefinida) fatorial/" + arity + " (Nº de parâmetros: " + arity + ") não está disponível.\n"
          + "Você quis dizer?\n"
          + availableArities.map(arity => " -> fatorial/" + arity + "\n" )
        )
      }

      // Isso pode ser refatorado (e colocar PatternMatching)
      if(arity === 1 && parameters[0] === 1) {
        return 1
      }
      if(arity === 1) {
        return parameters[0] * fatorial(parameters[0] - 1)
      }
    }
  */
 console.log(parametersSet)
 const availableArities = [...new Set(parametersSet.map(params => params.length))]
 let renderizedBody = ""
 let renderizedParams = ""
 
  const params = parametersSet.map((param, index) => {
    if(param.type !== "Identifier") {
      renderizedParams += `&& parameters[${index}] == ${param.image}`
    }
    const arity = param.length
    
    if(arity > 1) {
      renderizedBody += `
      if(arity === ${ arity } ${ params.map(param => `&& ${ param.image }) { ${ bodies } }`)})
      `
    }
  })

  return `
    function fatorial(...parameters) {
      const availableArities = ${availableArities} // #{Array:availableArities}
      const arity = parameters.length

      if(!availableArities.includes(arity)){
        throw new Error(
          "(Erro: Função Indefinida) ${functionName}/" + arity + " (Nº de parâmetros: " + arity + ") não está disponível.\n"
          + "Você quis dizer?\n"
          + availableArities.map(arity => " -> ${functionName}/" + arity + "\n" )
        )
      }

      ${renderizedBody}
    }`
}

module.exports = {
  renderProgram,
  renderFunctionDefinition
}