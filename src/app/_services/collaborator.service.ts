import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private collaborators = new BehaviorSubject<any>({});
  collaborator = this.collaborators.asObservable();

  private allCollaborators = new BehaviorSubject<any>({});
  allCollaborator = this.allCollaborators.asObservable();

  public baseUrl = 'https://cors-anywhere.herokuapp.com/https://swapi.dev/api/';
  public baseProxy = 'https://cors-anywhere.herokuapp.com/'

  constructor(private http: HttpClient) {
  }

  getCollaborator(id) {

    var collaboratorFull = {};
    const promise = new Promise((resolve, reject)=>{

      this.getApiCollaborator(id).subscribe(resp=>{
        collaboratorFull = resp;


        if(collaboratorFull['films'].length > 0){
          let firstFilm = collaboratorFull['films'];

          this.http.get(`${this.baseProxy}${firstFilm[0]}`).subscribe(resp=>{
            collaboratorFull['films'] = resp
            console.log("CollaboratorService -> films", collaboratorFull)
            this.collaborators.next(collaboratorFull);

          });


        }

        // get homeworld api
        if(collaboratorFull['homeworld'] != 'n/a'){
          this.http.get(`${this.baseProxy}${collaboratorFull['homeworld']}`).subscribe(resp=>{
            collaboratorFull['homeworld'] = resp;
            console.log("CollaboratorService -> homeworld", collaboratorFull)
            this.collaborators.next(collaboratorFull);

          });
        }

        // get starships api
        if(collaboratorFull['starships'].length > 0){
          let firstStarship = collaboratorFull['starships'];

          this.http.get(`${this.baseProxy}${firstStarship[0]}`).subscribe(resp=>{
            collaboratorFull['starships'] = resp;
            console.log("CollaboratorService -> starships", collaboratorFull)
            this.collaborators.next(collaboratorFull);

          });
        }

        // get vehicles api
        if(collaboratorFull['vehicles'].length > 0){
          let firstVehicle = collaboratorFull['vehicles'];

          this.http.get(`${this.baseProxy}${firstVehicle[0]}`).subscribe(resp=>{
            collaboratorFull['vehicles'] = resp;
            console.log("CollaboratorService -> vehicles", collaboratorFull)
            this.collaborators.next(collaboratorFull);
            resolve();
          });
        }else{
          resolve();
        }

      });

    }).then(() => {
      console.log("CollaboratorService -> getCollaborator -> then")
      collaboratorFull['endInfo'] = 'end'
      return this.collaborators;
    })

  }

  returnCollaborator(): Observable<any>{
    return this.collaborators;
  }


  getApiCollaborator(id): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  getAllCollaborators(): Observable<any> {

    if(Object.keys(this.allCollaborators['_value']).length > 0){
      return this.allCollaborators;

    }else{
      this.http.get(`${this.baseUrl}people/`).subscribe(resp=>{
        this.allCollaborators.next(resp);

      })
      return this.http.get(`${this.baseUrl}people/`);
    }

  }

}
