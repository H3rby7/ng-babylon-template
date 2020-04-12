import {RANK, SUIT} from './constants';
import {drawCardBySuitAndName} from './texture-pack';
import {Dimension} from '../../physicals/dimension';
import {
  Color3,
  Color4,
  DynamicTexture,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  StandardMaterial,
  Vector3,
  Vector4
} from '@babylonjs/core';

export const CARD_THICKNESS = 0.1;

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);
// Just White.
const vectorForSides = new Vector4(1, 0, 1, 0);

const faceUV = [vectorToFrontSide, vectorToBackSide, vectorForSides, vectorForSides, vectorForSides, vectorForSides];

const cardBoardWhite3 = Color3.FromInts(240, 240, 240);
const cardBoardWhite4 = Color4.FromColor3(cardBoardWhite3);
const faceColors = [cardBoardWhite4, cardBoardWhite4, cardBoardWhite4, cardBoardWhite4, cardBoardWhite4, cardBoardWhite4];

export const MATERIAL_SIZE: Dimension = {
  width: 366,
  height: 275,
};

const cardAspectRatio = (MATERIAL_SIZE.width / 2) / MATERIAL_SIZE.height;

export class PlayingCard {
  public mesh: Mesh;
  public size = 20;
  public position = Vector3.Zero();

  public constructor(public suit: SUIT, public rank: RANK) {
  }

  public addToScene(scene: Scene): PlayingCard {

    this.mesh = MeshBuilder.CreateBox(this.rank, {
      width: this.size * cardAspectRatio,
      height: this.size,
      depth: CARD_THICKNESS,
      sideOrientation: Mesh.DOUBLESIDE,
      faceUV,
      faceColors,
    }, scene);

    const myDynamicTexture = new DynamicTexture(`cardDt-${this.suit}-${this.rank}`, MATERIAL_SIZE, scene, false);

    drawCardBySuitAndName(myDynamicTexture, MATERIAL_SIZE, this.suit, this.rank);

    const cardMaterial = new StandardMaterial(`cardMat-${this.suit}-${this.rank}`, scene);
    cardMaterial.diffuseColor = cardBoardWhite3;
    cardMaterial.diffuseTexture = myDynamicTexture;

    this.mesh.material = cardMaterial;

    return this;
  }

  public enablePhysics(scene: Scene) {
    this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh,
      PhysicsImpostor.BoxImpostor,
      {mass: 0, restitution: 0, friction: 1, stiffness: 1},
      scene);
    this.position = this.mesh.physicsImpostor.physicsBody.position;
  }
}
