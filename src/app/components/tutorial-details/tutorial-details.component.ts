import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Tutorial } from 'src/app/model/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private _tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {
    if(!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string) {
    this._tutorialService.get(id)
    .subscribe({
      next: (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this._tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTutorial.published = status;
          this.message = res.message ? res.message: 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      })
  }

  updateTutorial():void {
    this.message = '';

    this._tutorialService.update(this.currentTutorial.id, this.currentTutorial)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This tutorial was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }


  deleteTutorial() : void {
    this._tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }



}
