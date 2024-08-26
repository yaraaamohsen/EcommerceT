import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('userToken') !== null){
      let userToken : any = {token : localStorage.getItem("userToken")}
      req = req.clone({
        setHeaders  : userToken 
      })
    }
  }
  return next(req);
};

 
  // let userToken!: any
  // if(typeof localStorage != 'undefined'){
  //   userToken = {token: localStorage.getItem('userToken')}
  // }
  // let header = req.clone({
  //   setHeaders: userToken
  // })
  // return next(header);
