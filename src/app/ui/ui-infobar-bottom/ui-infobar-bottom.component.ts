import {Component, OnInit} from '@angular/core';
import {PlayingCardService} from '../../modules/playing-card/playing-card.service';

@Component({
  selector: 'app-ui-infobar-bottom',
  templateUrl: './ui-infobar-bottom.component.html',
  styleUrls: ['./ui-infobar-bottom.component.scss'],
})
export class UiInfobarBottomComponent implements OnInit {

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
