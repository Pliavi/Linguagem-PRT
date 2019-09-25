# Functions

One function may have one or more clauses, each one that do something different, and the first that match parameters with the arguments are executed.

## How arguments will be matched?

It will be in runtime, first of all it will need to check the arity, the `functionCall` function has a `args` variable as the last parameter, and it is an array, and the clauses of the function will be filtered by their sizes:

```ts
function filterByArity(clauses: Array<Clause>, arity: number) {
  return clauses.filter(clause => arity === clause.paramList.length);
}
```

After that, it has to be matched by it signatures (or something like that), checking where the 'parameters' are values and if both argument and parameter are equal, example:

```prt
somar(x, 0) retorna x*2
somar(x, y) retorna x + y
```

If i use `somar(10, 0)` it will return `20` cause it has two arguments and the second one is the zero. But when i use `somar(5, 5)` it will return ten, because the second argument is not zero, so it ignore the first function and jump to the second implementation.

<!-- Match this is a bit complex, cause lists may be split as you can see in Haskell, Elixr, Erlang and other languages, like that -->
<!-- #### Haskell
```haskell
sum [] = 0
sum (h:t) = h + sum t
```
#### Elixir
```elixir
def sum([]), do: 0
def sum([h|t]), do: h + sum(t)
```
In both if i call `sum([1,2,3])` it will take in the first call the `1` to `h` and `[2, 3]` to `` -->

Match this is a bit complex, cause lists and tuples may be matching by it's content, that will not be easy to implement, let's face it:

```prt
principal(nome_arquivo)
  retorna mostrarArquivo(Arquivo.ler(nome_arquivo))

mostrarArquivo({"ok", texto}) retorna texto
mostrarArquivo({"erro", erro}) retorna provocar(Nucleo.erro(erro))
```

The `Arquivo.ler` returns a tuple with two values and it's matching it's content, but normally compare the value, but this is comparing, multiple values in a one deep level, but lists and tuples can be even deeper!

So in the firsts versions of PRT it will only compare value, so it will be necessary to use some kind of conditional statement (like ifte or cond/switch), that will be implemented, but in with the same level, in only value level.
The check would be something like that:

```ts
function takeMatchedClause(clauses: Array<Clause>, args: Array<any>) {
  const paramsArgsEquals = ({ type, value }, index) => {
    return type === "value" && value == args[index];
  };

  for (const clause of clauses) {
    const matched = clause.paramList.every(paramsArgsEquals);

    if (matched) return clause;
  }

  throw `Nenhuma clausula bate com os argumentos: ${args}`;
}
```
