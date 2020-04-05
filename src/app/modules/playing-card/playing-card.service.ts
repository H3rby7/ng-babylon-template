import {gridX, gridY} from './texture-pack';
import {Injectable} from '@angular/core';
import {EngineService} from '../../engine/engine.service';
import {PlayingCard} from './playing-card';
import Scene = BABYLON.Scene;
import Vector3 = BABYLON.Vector3;

@Injectable({providedIn: 'root'})
export class PlayingCardService {

  private cards: PlayingCard[];
  private scene: Scene;

  public constructor(private readonly engineService: EngineService) {
    this.engineService.onReady.subscribe(() => {
      this.scene = this.engineService.getScene();
      this.cards = this.createAll();
      this.layoutToGrid();
    });
  }

  public createAll(): PlayingCard[] {
    const cards: PlayingCard[] = [];
    for (const x of gridX) {
      for (const y of gridY) {
        const c = new PlayingCard(x, y);
        c.addToScene(this.scene);
        cards.push(c);
      }
    }
    return cards;
  }

  // Create a nice grid and flip every second card
  public layoutToGrid() {
    console.log('grid layout');
    const faceDownRotation = 0.5 * Math.PI;
    const faceUpRotation = -0.5 * Math.PI;
    const startX = -20;
    const startZ = -10;
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      const x = (i % 13);
      const y = Math.floor(i / 13 % 4);
      card.mesh.position.x = startX + x * card.size;
      card.mesh.position.y = 0.01;
      card.mesh.position.z = startZ + y * (card.size + 1) + 0.5 * card.size;
      const faceUp = (x + y) % 2 === 0;
      card.mesh.rotation = new Vector3(faceUp ? faceUpRotation : faceDownRotation, 0, 0);
    }
  }

  // Create a deck
  public layoutToDeck() {
    console.log('deck layout');
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      card.mesh.rotation = new Vector3(-0.5 * Math.PI, 0, 0);
      card.mesh.position.x = 0;
      card.mesh.position.y = 0.01 * i;
      card.mesh.position.z = 0;
    }
  }

  public shuffle(intensity = 1000) {
    const deckSize = this.cards.length;
    for (let i = 0; i < intensity; i++) {
      const c1 = Math.floor(Math.random() * deckSize);
      const c2 = Math.floor(Math.random() * deckSize);
      const tmp = this.cards[c1];
      this.cards[c1] = this.cards[c2];
      this.cards[c2] = tmp;
    }
    this.layoutToGrid();
  }

}
