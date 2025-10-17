import { Column } from '@/interfaces/forms';
import { User } from '@/interfaces/user';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { FormUser } from '@/pages/components/form-user/form-user';
import { UserService } from '@/services/user.service';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  imports: [AppMenuBar, DynamicTable, DialogModule, FormUser, Button, TableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
 

  users: WritableSignal<User[]> = signal<User[]>([]);
  modal: WritableSignal<boolean> = signal<boolean>(false);
  globalFilterFields: string[] = ['name', 'email', 'role', 'phone', 'ci'];
  columns: Column[] = [
    {
      sortTable: true,
      key: 'name',
      label: 'Nombre'
    },
    {
      sortTable: true,
      key: 'email',
      label: 'Correo'
    },
    {
      sortTable: true,
      key: 'role',
      label: 'Cargo'
    },
    {
      sortTable: true,
      key: 'phone',
      label: 'Teléfono'
    },
    {
      sortTable: true,
      key: 'ci',
      label: 'Cédula'
    },
    {
      sortTable: true,
      dataType: 'date',
      key: 'created_at',
      label: 'Fecha de Registro'
    }
  ];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.listUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
}
