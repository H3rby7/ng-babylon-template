import {gridX, gridY} from './texture-pack';
import {Injectable} from '@angular/core';
import {EngineService} from '../../engine/engine.service';
import {PlayingCard, CARD_THICKNESS} from './playing-card';
import {Scene, Vector3} from '@babylonjs/core';

const startX = -100;
const startY = 1;
const startZ = -40;

function getFaceRotation(isFaceUp: boolean): Vector3 {
  if (isFaceUp) {
    return new Vector3(-0.5 * Math.PI, 0, 0);
  } else {
    return new Vector3(0.5 * Math.PI, 0, 0);
  }
}


@Injectable({providedIn: 'root'})
export class PlayingCardService {

  private cards: PlayingCard[];
  private scene: Scene;

  public constructor(private readonly engineService: EngineService) {
    this.engineService.onReady.subscribe(() => {
      this.scene = this.engineService.getScene();
      this.cards = this.createAll();
      this.cards.forEach(e => e.enablePhysics(this.scene));
    });
  }

  public createAll(): PlayingCard[] {
    const cards: PlayingCard[] = [];
    for (const x of gridX) {
      const xI = gridX.indexOf(x);
      for (const y of gridY) {
        const yI = gridY.indexOf(y);
        const c = new PlayingCard(x, y);
        c.addToScene(this.scene);
        c.mesh.position.x = startX + yI * c.size;
        c.mesh.position.y = startY;
        c.mesh.position.z = startZ + xI * (c.size + 1) + 0.5 * c.size;
        const faceUp = (xI + yI) % 2 === 0;
        c.mesh.rotation = getFaceRotation(faceUp);
        cards.push(c);
      }
    }
    return cards;
  }

  // Create a nice grid and flip every second card
  public layoutToGrid() {
    console.log('grid layout');
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      const x = (i % 13);
      const y = Math.floor(i / 13 % 4);
      card.position.x = startX + x * card.size;
      card.position.y = startY;
      card.position.z = startZ + y * (card.size + 1) + 0.5 * card.size;
      const faceUp = (x + y) % 2 === 0;
      card.mesh.rotation = getFaceRotation(faceUp);
    }
  }

  // Create a deck
  public layoutToDeck() {
    console.log('deck layout');
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      card.mesh.rotation = getFaceRotation(false);
      card.position.x = 0;
      card.position.y = startY + 1.5 * CARD_THICKNESS * i;
      card.position.z = 0;
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
