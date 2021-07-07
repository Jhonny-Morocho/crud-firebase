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
  datosCompletos!:boolean;
  formUsuario!: FormGroup;
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  usuarioArray:UsuarioModel[]=[];
  constructor(private serverUser:UsuarioService,private formBuilder:FormBuilder){
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.listarUsuario();
  }
  crearUsuario(){
    console.log(this.formUsuario);
    if(this.formUsuario.invalid){
      this.datosCompletos=false;
    }else{
      this.instanciaUsuario.nombre=this.formUsuario.value.nombre;
      this.instanciaUsuario.apellido=this.formUsuario.value.apellido;
      this.instanciaUsuario.correo=this.formUsuario.value.correo;
      this.instanciaUsuario.telefono=this.formUsuario.value.telefono;
      this.instanciaUsuario.id=Date.now();


      this.serverUser.crarUsuarioPost(this.instanciaUsuario).subscribe(res=>{
        //presentamos mensaje datos guardadtos
        this.datosCompletos=true;
        //cargamos nuevmate la tabla de los usuaroios
        this.usuarioArray=[];
        this.listarUsuario();
        //borramos los datos del formulairo
        this.formUsuario.setValue({
          nombre:'',
          apellido:'',
          telefono:'',
          correo:'',
        });
      },error=>{
        alert("Error en la api de Firebase"+error);
      });

    }
  }
  crearFormulario(){
    this.formUsuario=this.formBuilder.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.required],
    });
   console.log(this.formUsuario);
  }
  listarUsuario():any{
    this.serverUser.listarUsuario().subscribe(
      usuario =>{
      console.log(usuario);
      this.usuarioArray=usuario;
      },(error)=>{
        console.log(error);
      }
    );
  }
  editar(){
  console.log("soy editar");
  }
  eliminar(id:any){
    console.log("soy eliminar con el id "+id);
  }
}
