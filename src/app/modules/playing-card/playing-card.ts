import {RANK, SUIT} from './constants';
import {drawCardBySuitAndName} from './texture-pack';
import {Dimension} from '../../physicals/dimension';
import {Color3, DynamicTexture, Mesh, MeshBuilder, Scene, StandardMaterial, Vector4} from '@babylonjs/core';

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);
// Just White.
const vectorForSides = new Vector4(1, 0, 1, 0);

const faceUV = [vectorToFrontSide, vectorToBackSide, vectorForSides, vectorForSides, vectorForSides, vectorForSides];

export const MATERIAL_SIZE: Dimension = {
  width: 366,
  height: 275,
};

const cardAspectRatio = (MATERIAL_SIZE.width / 2) / MATERIAL_SIZE.height;

export class PlayingCard {
  public mesh: Mesh;
  public size = 3;

  public constructor(public suit: SUIT, public rank: RANK) {
  }

  public addToScene(scene: Scene): PlayingCard {

    this.mesh = MeshBuilder.CreateBox(this.rank, {
      width: this.size * cardAspectRatio,
      height: this.size,
      depth: 0.01,
      sideOrientation: Mesh.DOUBLESIDE,
      faceUV
    }, scene);

    const myDynamicTexture = new DynamicTexture(`cardDt-${this.suit}-${this.rank}`, MATERIAL_SIZE, scene, false);

    drawCardBySuitAndName(myDynamicTexture, MATERIAL_SIZE, this.suit, this.rank);

    const cardMaterial = new StandardMaterial(`cardMat-${this.suit}-${this.rank}`, scene);
    cardMaterial.diffuseColor = new Color3(240, 240, 240);
    cardMaterial.diffuseTexture = myDynamicTexture;

    this.mesh.material = cardMaterial;

    return this;
  }
}
