# Leaf's Definition

### Global legend

- **\$anything:** A variable name

## Module [PRTModule]

```js
{
  name: "$module_name";
  functions: [PRTFunction, PRTFunction, PRTFunction];
}
```

## Function [PRTFunction]

```js
{
  name: "$function_name";
  clauses: [Clause, Clause, Clause];
}
```

## Function Clause [Clause]

```js
{
  index: 1,
  paramList: [Param, Param, Param],
  functionBody: (param_0, param_1, param_2) => {}
}
```

## Param [Param]

```js
{
  type: "value" | "identifier",
  value: Constant | Pointer
}
```

### Legend:

- **Constant:** A value, list, string, number, anything;
- **Pointer:** Another identifier, that points to the runtime value
