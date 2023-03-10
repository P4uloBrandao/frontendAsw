import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy{
  public userInfo: any;
  public local: any;
  public userForm!: FormGroup;
  public preferenceForm!: FormGroup;
  private observable: any;
  constructor(private http: HttpService, private formBuilder: FormBuilder,) {
    this.local = (localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    if (this.local) {
      this.local = JSON.parse(this.local);
      this.observable = this.http.getUserById(this.local.token).subscribe((response) => {
        this.userInfo = response.data;
        this.userForm = this.formBuilder.group(
          {
            nome: [this.userInfo.nome, [Validators.required]],
            email: [this.userInfo.email, [Validators.required, Validators.email]],
            dataNascimento: [this.userInfo.dataNascimento, [Validators.required]],
            genero: [this.userInfo.genero, [Validators.required]],
            morada: [this.userInfo.morada, [Validators.required]],
            localidade: [this.userInfo.localidade, [Validators.required]],
            codigoPostal: [this.userInfo.codigoPostal, [Validators.required]],
            telefone: [
              this.userInfo.telefone,
              [
                Validators.required,
                Validators.min(100000000),
                Validators.max(999999999),
              ],
            ]
          }
        );
        
      });
    }
    this.preferenceForm = this.formBuilder.group(
      {
        categoria: ['', [Validators.required]],
        marca: ['', [Validators.required]],
      }
    )
  }

  ngOnDestroy(): void {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  }
}
