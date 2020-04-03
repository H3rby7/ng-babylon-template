import { Component, OnInit } from '@angular/core';
import {EngineService} from '../../engine/engine.service';

@Component({
  selector: 'app-ui-infobar-top',
  templateUrl: './ui-infobar-top.component.html'
})
export class UiInfobarTopComponent implements OnInit {

  public constructor(private readonly engine: EngineService) { }

  public ngOnInit(): void {
  }

  public toGrid() {
    this.engine.layoutToGrid();
  }


  public toDeck() {
    this.engine.layoutToDeck();
  }

}
