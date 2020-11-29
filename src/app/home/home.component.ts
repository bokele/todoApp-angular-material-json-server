import { Component,AfterViewInit, OnInit,  ViewChild } from '@angular/core';
import { Todo } from '../interface/todo';
import { TodoService } from '../services/todo.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../action/dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  todo: Todo[] = [];
  dataSource;
  displayedColumns: string[] = ['action', 'id', 'name', 'createdAt', 'editedAt'];
  constructor(public todoService: TodoService, public dialog: MatDialog, public snackbar :  MatSnackBar) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  ngOnInit(): void {
     this.todoService.getAll().subscribe((data: Todo[])=>{
       console.log(data);
      this.todo = data
       this.dataSource = new MatTableDataSource<Todo>(data);
       this.dataSource.paginator = this.paginator;

    })
  }



  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result.event  == 'Add'){
        this.addRowData(result.data);
      }else if(result.event  == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event  == 'Delete'){
        this.deleteRowData(result.data);
      }
    });

  }

/// Adding new data in the database
  addRowData(row_obj) {
    //create the data  object to insert in the database
    let data = {
      name: row_obj.name,
      description: row_obj.description,
      createdAt: new Date(),
      editedAt: new Date(),
    }
    row_obj = data
    this.todoService.create(row_obj).subscribe(res => {
      console.log('Todo Created')
     this.snackbar.open('Todo has been Created', 'Created');

    })
    this.table.renderRows();

  }

  // updating the data
  updateRowData(row_obj){
    this.dataSource = this.dataSource.data.filter((value, key) => {
      if (value.id ==  row_obj.id) {
        let data = {
          name: row_obj.name,
          description: row_obj.description,
          createdAt: row_obj.createdAt,
          editedAt: new Date(),
        }
        this.todoService.update(row_obj.id, data).subscribe(res => {
          console.log('Todo Updateed')
          this.snackbar.open('Todo has been Updated', 'Updated');
        })

        return true
      }



    });
  }

  deleteRowData(row_obj){
    this.dataSource = this.dataSource.data.filter((value,key)=>{
      if (value.id == row_obj.id) {
        this.todoService.delete(row_obj.id).subscribe(res => {
          console.log('Todo delete')
          this.snackbar.open('Todo has been Deleted', 'Deleted');
          return value.id != row_obj.id;
        })
      }
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

}


