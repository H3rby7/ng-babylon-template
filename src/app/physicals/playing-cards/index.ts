import {Vector4} from 'babylonjs/babylon';
import {RANK, SUIT} from './constants';
import {drawCardBySuitAndName} from './texture-pack';
import Scene = BABYLON.Scene;
import {Dimension} from '../dimension';

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);

export const MATERIAL_SIZE: Dimension = {
  width: 183,
  height: 275,
};

const cardAspectRatio = 0.6;

export const createCard = (scene: Scene, suit: SUIT, rank: RANK, size = 10): BABYLON.Mesh => {

  const card = BABYLON.MeshBuilder.CreatePlane(rank, {
    width: size * cardAspectRatio,
    height: size,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: vectorToFrontSide,
    backUVs: vectorToBackSide
  }, scene);

  const myDynamicTexture = new BABYLON.DynamicTexture(`cardDt-${suit}-${rank}`, 2 * MATERIAL_SIZE.width, scene, false);

  drawCardBySuitAndName(myDynamicTexture, MATERIAL_SIZE, suit, rank);

  const cardMaterial = new BABYLON.StandardMaterial(`cardMat-${suit}-${rank}`, scene);
  cardMaterial.ambientTexture = myDynamicTexture;

  card.material = cardMaterial;

  return card;
};
