import { Component, OnInit } from '@angular/core';
import { ApiClienteService } from '../services/api-cliente.service';
import {Response} from '../models/response';
import { DialogComponent } from '../dialog-clientes/dialog-clientes.component';
import {MatDialog} from '@angular/material/dialog';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public lst: any[] = [];
  public columnas: string[] = ['id', 'nombre', 'action'];
  readonly widht: string = "300px";

  constructor(
    private apiCliente: ApiClienteService,
    public dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(){
   this.apiCliente.getClientes().subscribe(response =>{
     this.lst = response.data;
    });
  
  }
  openAdd(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: this.widht
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getCliente();
    });
  }

  openEdit(cliente : Cliente){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: this.widht,
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getCliente();
    });
  }

}
