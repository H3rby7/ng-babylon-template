import {Component, OnInit} from '@angular/core';
import {PlayingCardService} from '../../modules/playing-card/playing-card.service';

@Component({
  selector: 'app-ui-infobar-top',
  templateUrl: './ui-infobar-top.component.html'
})
export class UiInfobarTopComponent implements OnInit {

  public constructor(private readonly service: PlayingCardService) {
  }

  public ngOnInit(): void {
  }

  public toGrid() {
    this.service.layoutToGrid();
  }

  public toDeck() {
    this.service.layoutToDeck();
  }

  public shuffle() {
    this.service.shuffle();
  }

}
