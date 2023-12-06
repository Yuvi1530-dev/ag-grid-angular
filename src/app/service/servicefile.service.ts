import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ServicefileService {
  Api: any = '';
  key: any = ''
  constructor(private http: HttpClient) {
    this.Api = environment.api;
    this.key = environment.secretKey
  }

  getData(model: any, mode: any): any {
    const httpHeaders: any = new HttpHeaders();
console.log("erer")

if(mode=="POST"){
  return this.http.post('', model, { headers: httpHeaders })

}else if(mode =='GET'){
  return this.http.get(this.Api+'?key='+this.key+'&maxResults=50&type=video&part=snippet&q=jhon', { headers: httpHeaders })

}
  }

  private serializeObject(obj: any) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&")
  }

  //Slect Box Data Pass
  private checkboxValueSubject = new BehaviorSubject<{ value: any; isChecked: boolean }>({
    value: null,
    isChecked: false,
  });
  checkboxValue$ = this.checkboxValueSubject.asObservable();

  setCheckboxValue(value: any,isChecked:boolean): void {
    this.checkboxValueSubject.next({value,isChecked});
  }

  //Used fro select all
  private SelectAllSubject = new BehaviorSubject<{ value: any; isChecked: boolean }>({
    value: null,
    isChecked: false,
  });
  selectBox$ = this.SelectAllSubject.asObservable();

  setSelectall(value: any,isChecked:boolean): void {
    this.SelectAllSubject.next({value,isChecked});
  }
  getTemplateData() {
    // Implement logic to retrieve template data from a database, API, or generate it
    return {
      // Sample template data
      headerTemplate: '<div>Header Template</div>',
      rowTemplate: '<div>Row Template</div>',
      // Add more template data as needed
    };
  }
}
