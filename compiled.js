function Matematico() {
function fatorial() {
      function fatorial0(params) {
        
        return 1;
      }
    
      if(arguments.length == 1 && arguments[0] == 1){
        return fatorial0(arguments);
      }
    
      function fatorial1(params) {
        const n = params[0];
        return n*fatorial(n-1);
      }
    
      if(arguments.length == 1 ){
        return fatorial1(arguments);
      }
    };function principal() {
      function principal0(params) {
        
        return fatorial(10);
      }
    
      if(arguments.length == 0 ){
        return principal0(arguments);
      }
    };
    return {fatorial,principal}
    }