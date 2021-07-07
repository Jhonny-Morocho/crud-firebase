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
  existeId!:boolean;
  idUsuario!:string;
  posicion!:any;
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
    //valdiar que el formulario tenga datos
    if(this.formUsuario.invalid){
      this.datosCompletos=false;
      return;
    }


    //actualizar usuario
    if(this.existeId==true ){
      console.log('editar');
      this.instanciaUsuario.nombre=this.formUsuario.value.nombre;
      this.instanciaUsuario.apellido=this.formUsuario.value.apellido;
      this.instanciaUsuario.correo=this.formUsuario.value.correo;
      this.instanciaUsuario.telefono=this.formUsuario.value.telefono;
      //actualizo el registro
      //this.usuarioArray[this.posicion] = this.instanciaUsuario;
      for (var i in this.usuarioArray) {
        if(this.usuarioArray[i]['id']==this.instanciaUsuario.id){
          this.usuarioArray[i]=this.instanciaUsuario;
        }
      }
      this.serverUser.editarUsuario(this.usuarioArray).subscribe(
        res=>{
          console.log(res);
          this.existeId=false;
          this.formUsuario.setValue({
            nombre:'',
            apellido:'',
            telefono:'',
            correo:'',
          });
          this.usuarioArray=[];
          this.listarUsuario();
        },error=>{
          console.log(error);
        }
      );
      return;

    }
    //agregar usuario
    console.log("crear");
    //si  no va a editar entonces que lo crear al registro
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
  crearFormulario(){
    this.formUsuario=this.formBuilder.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.required],
    });
  }
  listarUsuario():any{
    this.serverUser.listarUsuario().subscribe(
      usuario =>{
      this.usuarioArray=usuario;
      },(error)=>{
        console.log(error);
      }
    );
  }
  editar(id:any){
    for (var i in this.usuarioArray) {
      //console.log(this.usuarioArray[i]['id']); // a, b, c
      if(this.usuarioArray[i]['id']==id){
        this.formUsuario.setValue({
          nombre:this.usuarioArray[i]['nombre'],
          apellido:this.usuarioArray[i]['apellido'],
          telefono:this.usuarioArray[i]['telefono'],
          correo:this.usuarioArray[i]['correo'],
        });
        //le vuelvo acutlizar el mismo id
        this.existeId=true;
        this.instanciaUsuario.id=this.usuarioArray[i]['id'];
      }

    }

  }
  eliminar(id:any){
    for (var i in this.usuarioArray) {
      //console.log(this.usuarioArray[i]['id']); // a, b, c
      if(this.usuarioArray[i]['id']==id){
        this.usuarioArray.splice(Number(i),1);
      }
    }
    this.serverUser.eliminarUsuario(this.usuarioArray).subscribe(
      res=>{
        //console.log(res);
      },error=>{
        console.log(error);
      }
    );
  }
}
