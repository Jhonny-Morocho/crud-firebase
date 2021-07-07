import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {UsuarioModel} from 'src/app/models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  dominio:string="https://crud-af3a4-default-rtdb.firebaseio.com/usuario.json";

  constructor(private httCLiente:HttpClient) { }
  //este codigo es de angular
  listarUsuario(){
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
  eliminarUsuario(usuario:UsuarioModel[]){
    return this.httCLiente.put(this.dominio,usuario).pipe(
      map(res=>{
          console.log(res);
          return this.crearArray(res);
        })
    );
  }
  editarUsuario(usuario:UsuarioModel[]){
    return this.httCLiente.put(this.dominio,usuario).pipe(
      map(res=>{
          console.log(res);
          return this.crearArray(res);
        })
    );
  }
}
