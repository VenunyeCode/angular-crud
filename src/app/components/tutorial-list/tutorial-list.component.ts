import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/model/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private _tutorialService: TutorialService) { }



  ngOnInit(): void {
  }

  retrieveTutorials(): void {
    this._tutorialService.getAll()
    .subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.log(e)
    })
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this._tutorialService.deleteAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    })
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this._tutorialService.findByTitle(this.title)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.tutorials = data;
      },
      error: (e) => console.error(e)
    })
  }


}
