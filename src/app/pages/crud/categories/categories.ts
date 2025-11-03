import { Component } from '@angular/core';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/pages/service/node.service';
import { Column } from '@/interfaces/forms';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [AppMenuBar, TreeTableModule, Button,CommonModule],
  providers: [NodeService],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  files!: TreeNode[];

  cols!: any[];

  constructor(private nodeService: NodeService) {}

  ngOnInit() {
    this.nodeService.getFilesystem().then((files) => (this.files = files));
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
      { field: '', header: '' }
    ];
  }
}
