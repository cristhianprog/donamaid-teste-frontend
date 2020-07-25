import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from "@angular/material/dialog";
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})

export class CollaboratorComponent implements OnInit {
  public id: String =  '0';
  public infos: any = {};
  public birth_year: string;
  public allCollaborators: any = [];

  constructor(private serviceCollaborator: CollaboratorService,
              private router: Router,
              public dialog: MatDialog,
              private route: ActivatedRoute,) {

    let id_url = this.route.snapshot.paramMap.get('id');
    console.log("CollaboratorComponent -> this.id", this.id)

    this.serviceCollaborator.getCollaborator(`people/${id_url}/`);
    this.serviceCollaborator.returnCollaborator().subscribe(resp =>{
      this.infos = resp;
      console.log("CollaboratorComponent -> resp", this.infos)
      this.birth_year = this.infos.birth_year == undefined ? '': this.infos.birth_year.substring(0,this.infos.birth_year.indexOf("B"))
      setTimeout(() => {
        this.id = id_url;
        this.id == null ? this.id='1': this.id;
      }, 2000);

    });

    this.serviceCollaborator.getAllCollaborators().subscribe(resp => {
    console.log("CollaboratorComponent -> resp +++++++++++++++++++++", resp)
      this.allCollaborators = resp.results;
      console.log("CollaboratorComponent -> this.allCollaborators", this.allCollaborators)
    });


   }

  ngOnInit(): void {

  }

  click_button(){
    console.log('clicou!');
    let dialogRef = this.dialog.open(LoginComponent, {
         panelClass: 'custom-modal'

        });

      dialogRef.afterClosed().subscribe(result => {
			  console.log("TCL: ClientFormComponent -> upload -> result", result)


			});
  }

  nextCollaborator(id){
    let oldId = id;
    console.log('clicou next! ---- ', id);
    this.router.navigate([`/login`]).then(()=>{
      this.router.navigate([`/colaborador/${id}/`]);
    });

  }

}

