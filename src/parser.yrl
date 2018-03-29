Nonterminals
module 
exprs
number
.

Terminal 
t_and t_or t_not t_bool op_add op_sub op_mul op_div op_mod op_rem op_comp op_list_concat 
op_list_sub number_float number_integer t_comment string string_simple t_identifier t_atom
.

Rootsymbol module.


expr -> number : $1
expr -> expr op_add  expr
expr -> expr op_sub  expr
expr -> expr op_mul  expr
expr -> expr op_div  expr
expr -> expr op_mod  expr
expr -> expr op_rem  expr
expr -> expr op_comp expr

%%% ABSTRACTIONS
% Numbers (maybe add char and string as numbers too)
number -> number_float   : $1
number -> number_integer : $1

Erlang code.


12 + 15

expr > number > 12
expr > op_add(+) > number > 15
