# Imports and Modules

## How the leafs works

All theses leafs are created in compile time.
But they are called in runtime.

The module are "imported" (the running module is set as an empty name to local scope as "localModule"[1]) and set in a object in a "imports" object as an global scope.

That object has a `callFunction` function that receives the module name, function name to be called and arguments as array, and call it as:

```js
imports.callFunction("${module_name}", "${function_name}", args);
```

And that `callFunction` is the responsible to call other helpers functions to achieve the real function to call, by comparing the function clauses and returning all matching one and calling the first of this list[2].

- [1] Maybe "localModule" was not a good ideia, as it can be used in a module name and conflict, but for now it'll be.
- [2] Maybe in compile time it will be cool to add a check to unreachable functions.

## Leafs definition

### Legend:

- **\$anything:** A variable name
- **Constant:** A value, list, string, number, anything;
- **Pointer:** Another identifier, that points to the runtime value

### Imports

```js
const globals =
  {
    localModule: PRTModule,
    imports: {
      $module_0: PRTModule,
      $module_1: PRTModule,
      ... // modules are added by name
    },
    callFunction: () => {}
  }

globals.bind(globals) // To use globals as `this`
```

### Modules

**named as:** PRTModule

```js
{
  name: "$module_name",
  functions: [PRTFunction, PRTFunction, PRTFunction]
}
```

### Function

**named as:** PRTFunction

```js
{
  name: "$function_name",
  clauses: [Clause, Clause, Clause]
}
```

### Function Clause

**named as:** Clause

```js
{
  index: 1,
  paramList: [Param, Param, Param],
  functionBody: (param_0, param_1, param_2) => {}
}
```

### Param

**named as:** Param

```js
{
  type: "value" | "identifier",
  value: Constant | Pointer
}
```
