import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiClienteService } from 'src/app/services/api-cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-dialog-clientes',
  templateUrl: './dialog-clientes.component.html',
  styleUrls: ['./dialog-clientes.component.scss']
})
export class DialogComponent  implements OnInit{

  public nombre: string="";

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public apiCliente: ApiClienteService, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente : Cliente        
    )  {
      if(this.cliente != null){
        this.nombre = cliente.nombre; 
      }
     }

  close() {
    this.dialogRef.close();
}

ngOnInit(): void {
  
}

editCliente(){
  const cliente: Cliente = { nombre: this.nombre, id: this.cliente.id };

  this.apiCliente.edit(cliente).subscribe(Response => {
    if (Response.exito == 1) {
        this.close();
        this.snackBar.open("Cliente editado con exito", '', { duration: 1000 });
    }
});
}

addCliente() {
    const cliente: Cliente = { nombre: this.nombre, id: 0 };
    this.apiCliente.add(cliente).subscribe(Response => {
        if (Response.exito == 1) {
            this.close();
            this.snackBar.open("Cliente insertado con exito", '', { duration: 1000 });
        }
    });

  }
}
