import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/model/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  _tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted=false;

  constructor(private _tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial():void {
    const data = {
      title: this._tutorial.title,
      description: this._tutorial.description
    };
    
    this._tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      })

  }

  newTutorial(): void {
    this.submitted = false;
    this._tutorial = {
      title: '',
      description: '',
      published: false
    }
  }

}
