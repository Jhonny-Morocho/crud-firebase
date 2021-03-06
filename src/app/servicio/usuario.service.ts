import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {UsuarioModel} from 'src/app/models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  dominio:string="https://vacunados-c7bb6-default-rtdb.firebaseio.com/.json";

  constructor(private httCLiente:HttpClient) { }
  //este codigo es de angular
  cargarDatosBd(){
    return this.httCLiente.get(this.dominio).pipe(
      map(res=>{
          console.log(res);
          return this.crearArray(res);
        })
    );
  }
  crarUsuarioPost(usuario:UsuarioModel){
      return this.httCLiente.post(this.dominio,usuario).pipe(
        map(res=>{
            console.log(res);
            return this.crearArray(res);
          })
      );
  }
  crearArray(obj:any){
    const usuarioList:UsuarioModel[]=[];
    if(obj==null){
      return [];
    }
    Object.keys(obj).forEach(
      key=>{
        const usuarioTemp:UsuarioModel=obj[key];
        usuarioList.push(usuarioTemp);
      }
    );
    return usuarioList;
  }

}
