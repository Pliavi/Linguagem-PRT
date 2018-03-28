Definitions.
% Operadores booleanos
And  = e
Or   = ou
Not  = não
Bool = (verdadeiro|falso)

% Operadores aritméticos
Add = \+
Sub = -
Mul = \*
Div = /
Mod = % % TODO: Verify escape
Rem = //

% Comparadores
Comp   = (<|<=|==|!=|>=|>)

% Operadores de lista
Concat    = \+\+
DoubleSub = --

% Números
Integer = [0-9]
Float   = [0-9]+\.[0-9]+

% Delimitadores
Delimiters = (\(|\)|\[|\]|\{|\}) % XXX: Set itself as token
EOL        = (\r?\n)
WS         = \s+
Tabs       = \t+

% Símbolos
Symbols    = (,|=|::|:|\|=>|\|>) % XXX: Set itself as token
                                 % ,  = Param delimiter
                                 % :: = Type
                                 % :  = Atom
                                 % =  = assign
                                 % |  = Guards and Lists Pattern Matching
                                 % => = Anonymous functions
                                 % |> = PipeOperator

% Comentarios e 
Hash = #

% Simbolos especiais XXX: Que ainda não sei onde utilizar
Warn   = !
At     = @
Dollar = \$

% Strings
String  = "(\\\^.|\\.|[^\"])*"
BString = '(\\\^.|\\.|[^\'])*'
Infix   = `(\\\^.|\\.|[^\`])*`

% Identificadores e Átomos
Atom        = :{Identifier}
Identifier  = [a-zA-Z\_][a-zA-Z0-9\_]* % TODO: Adicionar caracteres acentuados e cedilha

Rules.

% Operadores booleanos
{And}                    : make_token(t_and , TokenLine, TokenChars).
{Or}                     : make_token(t_or  , TokenLine, TokenChars).
{Not}                    : make_token(t_not , TokenLine, TokenChars).
{Bool}                   : make_token(t_bool, TokenLine, TokenChars).

% Operadores aritméticos TODO: DEFINIR PRECEDENCIAS!
{Add}                    : make_token(op_add, TokenLine, TokenChars).
{Sub}                    : make_token(op_sub, TokenLine, TokenChars).
{Mul}                    : make_token(op_mul, TokenLine, TokenChars).
{Div}                    : make_token(op_div, TokenLine, TokenChars).
{Mod}                    : make_token(op_mod, TokenLine, TokenChars).
{Rem}                    : make_token(op_rem, TokenLine, TokenChars).

% Comparadores
{Comp}                   : make_token(op_comp, TokenLine, TokenChars).

% Operadores de lista
{Concat}                 : make_token(op_list_concat, TokenLine, TokenChars).
{DoubleSub}              : make_token(op_list_sub   , TokenLine, TokenChars).

% Números
{Float}                  : make_token(number_float,   TokenLine, TokenChars, fun erlang:list_to_float/1).
{Integer}+               : make_token(number_integer, TokenLine, TokenChars, fun erlang:list_to_integer/1).

% Delimitadores
% TODO: Colocar aqui os "autotokens"

% Comentários
{Hash} = #               : make_token(t_comment, TokenLine, TokenChars).

% Strings
{String}                 : build_string(string, TokenChars, TokenLine, TokenLen).
{BString}                : build_string(string_simple, TokenChars, TokenLine, TokenLen).

% Átomos e Identificadores
{Identifier}             : make_token(t_identifier, TokenLine, TokenChars).
{Atom}                   : make_token(t_atom, TokenLine, TokenChars).

% Ignoráveis
{Endls}                 : make_token(nl, TokenLine, endls(TokenChars)).
{Whites}                : skip_token.
{Tabs}                  : skip_token.

Erlang code.

-export([is_reserved/1]).

make_token(Name, Line, Chars) when is_list(Chars) ->
    {token, {Name, Line, list_to_atom(Chars)}};
make_token(Name, Line, Chars) ->
    {token, {Name, Line, Chars}}.

make_token(Name, Line, Chars, Fun) ->
    {token, {Name, Line, Fun(Chars)}}.

