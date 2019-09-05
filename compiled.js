function Matematico() {
function identidade() {
      function identidade0(params) {
        const n = params[0];
        return n;
      }
    
      if(arguments.length == 1 ){
        return identidade0(arguments);
      }
    };function multiplicar() {
      function multiplicar0(params) {
        const x = params[0];const y = params[1];
        return x*y;
      }
    
      if(arguments.length == 2 ){
        return multiplicar0(arguments);
      }
    };function fatorial() {
      function fatorial0(params) {
        
        return identidade(1);
      }
    
      if(arguments.length == 1 && arguments[0] == 1){
        return fatorial0(arguments);
      }
    
      function fatorial1(params) {
        const n = params[0];
        return multiplicar(n,fatorial(n-1));
      }
    
      if(arguments.length == 1 ){
        return fatorial1(arguments);
      }
    };function principal() {
      function principal0(params) {
        
        return fatorial(5);
      }
    
      if(arguments.length == 0 ){
        return principal0(arguments);
      }
    };
    return {identidade,multiplicar,fatorial,principal}}
     
 Matematico().principal()