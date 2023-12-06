import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
@Component({
  selector: 'app-espera',
  templateUrl: './espera.page.html',
  styleUrls: ['./espera.page.scss'],
})
export class EsperaPage implements OnInit {
  constructor(private dbService:DbService, private router:Router) { }
  ngOnInit() {
    
    setTimeout(()=>{
      this.dbService.verificarSesion().then(data =>{
        if (data == 0){
          this.router.navigate(['login'],{replaceUrl:true})
        }
        else{
          this.router.navigate(['principal'],{replaceUrl:true})
        }
      })
    },2000)
  }

}