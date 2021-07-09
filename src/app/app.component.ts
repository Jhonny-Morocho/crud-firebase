import { Component } from '@angular/core';
import {UsuarioService} from 'src/app/servicio/usuario.service';
import { Subject } from 'rxjs';
import { UsuarioModel } from './models/usuario.model';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  usuarioEncontrado!:boolean;
  formUsuario!: FormGroup;
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  usuarioArray:UsuarioModel[]=[];
  constructor(private serverUser:UsuarioService,private formBuilder:FormBuilder){
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  crearFormulario(){
    this.formUsuario=this.formBuilder.group({
      buscar:['',Validators.required],
    });
  }

  buscar(){
    var cedula=this.formUsuario.value.buscar;
    for (var i in this.usuarioArray) {
      //console.log(this.usuarioArray[i]['id']); // a, b, c
      if(this.usuarioArray[i]['cedula']==cedula){
        console.log(this.usuarioArray[i]['cedula']);
        this.instanciaUsuario.cedula=this.usuarioArray[i]['cedula'];
        this.instanciaUsuario.nombre=this.usuarioArray[i]['nombre'];
        this.instanciaUsuario.apellido=this.usuarioArray[i]['apellido'];
        this.instanciaUsuario.canton=this.usuarioArray[i]['canton'];
        this.instanciaUsuario.provincia=this.usuarioArray[i]['provincia'];
        this.instanciaUsuario.parroquia=this.usuarioArray[i]['parroquia'];
        this.instanciaUsuario.centrovacunacion=this.usuarioArray[i]['centrovacunacion'];
        this.usuarioEncontrado=true;
      }
    }
    if(!this.usuarioEncontrado){
        alert("El usuario con el numero de cedula: ["+cedula +"] no ha sido encontrado");
        this.instanciaUsuario.cedula="";
        this.instanciaUsuario.nombre="";
        this.instanciaUsuario.apellido="";
        this.instanciaUsuario.canton="";
        this.instanciaUsuario.provincia="";
        this.instanciaUsuario.parroquia="";
        this.instanciaUsuario.centrovacunacion="";
    }
    this.usuarioEncontrado=false;

  }
  cargarDatos():any{

    this.serverUser.cargarDatosBd().subscribe(
      usuario =>{
      this.usuarioArray=usuario;

      },(error)=>{
        console.log(error);
      }
    );
  }
}
