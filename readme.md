> Esse nome _PRT_ será alterado
# Linguagem _PRT_
Linguagem de programação em português para aprendizado do paradigma funcional

<!-- ## Funções de alta ordem
São funções que recebem uma ou mais funções como parâmetro ou retornam uma função como resultado.
Exemplo em _PRT_:
```PRT
módulo AltaOrdem onde
	# A função 'aplicar_para' recebe uma função como parâmetro
	aplicar_para(x, função) retorna função(x)

	somar(x, y) retorna x + y
fim

# Usando 'Currying' somar(5) retorna uma função `somar(5, y)`
aplicar_para(10, somar(5)) # 15
``` -->
## Recursividade
Recursividade é uma das características principais da linguagem funcional. Ela define que uma função pode chamar ela mesma quantas vezes forem necessárias, em linguagens funcionais essa estrutura substitui a utilização de laços de repetição, como _for_ (para) e _while_ (enquanto), das linguagens estruturadas.

Fatorial com laço de repetição em Java:
```java
// Utilizando enquanto (while)
public int fatorial_enquanto(int n){
	int resultado = 0;
	while(n > 1){
		resultado *= n--;
	}
	return resultado;
}

// Utilizando para (for)
public int fatorial_for(int n){
	int resultado = 0;
	for(int i = 2; i <= n; i++){
		resultado *= i;
	}
	return resultado
}

// Utilizando recursão
public int fatorial_recursivo(int n) {
	return (n > 1) 
	? n * fatorial_recursivo(n--) 
	: 1;
}
```

Fatorial recursivo em _PRT_:
```PRT
# Ou usando casamento de padrões
fatorial(1) retorna 1
fatorial(n) retorna n * fatorial(n-1)
```
