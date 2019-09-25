/* Root types */
type Globals = {
  main: PRTModule;
  imports: Map<string, PRTModule>;
  // callFunction(
  //   moduleName: string | null,
  //   functionName: string,
  //   args: Array<any>
  // ): void;
};

type PRTModule = {
  name: string;
  functions: Map<string, PRTFunction>;
};

type PRTFunction = {
  name: string;
  clauses: Array<Clause>;
};

type Clause = {
  index: number;
  paramList: Array<Parameter>;
  call: Function;
};

type Parameter = {
  type: ParameterType;
  value: any;
};
enum ParameterType {
  Value = "value",
  Identifier = "identifier"
}

type Caller = {
  moduleName: string;
  functionName: string;
};

export {
  Globals,
  PRTModule,
  PRTFunction,
  Clause,
  Parameter,
  ParameterType,
  Caller
};
