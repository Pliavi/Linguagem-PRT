function Matematico() {
      if(params.length == 1) {
        return fatorial0(params);
      }
    
      const fatorial0 = params => {
        const 1 = params[0];
        return 1;
      }
    
      if(params.length == 1) {
        return fatorial1(params);
      }
    
      const fatorial1 = params => {
        const n = params[0];
        return n*fatorial(n-1);
      }
    
      if(params.length == 0) {
        return principal0(params);
      }
    
      const principal0 = params => {
        
        return fatorial(10);
      }
    }