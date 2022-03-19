import { Component, OnInit ,Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  @Input() text : string = 'search'

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
   
  }
  
  onSubmit(form :NgForm): void {
    this.router.navigate(['search',form.value.search]);
  }


}
