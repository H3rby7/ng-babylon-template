import {Vector4} from 'babylonjs/babylon';
import {RANK, SUIT} from './constants';
import {drawCardBySuitAndName, gridX, gridY} from './texture-pack';
import {Dimension} from '../dimension';
import Scene = BABYLON.Scene;
import Mesh = BABYLON.Mesh;
import Color3 = BABYLON.Color3;
import Vector3 = BABYLON.Vector3;

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);

export const MATERIAL_SIZE: Dimension = {
  width: 366,
  height: 275,
};

const cardAspectRatio = (MATERIAL_SIZE.width / 2) / MATERIAL_SIZE.height;

export const createCard = (scene: Scene, suit: SUIT, rank: RANK, size = 10): Mesh => {

  const card = BABYLON.MeshBuilder.CreatePlane(rank, {
    width: size * cardAspectRatio,
    height: size,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: vectorToFrontSide,
    backUVs: vectorToBackSide,
  }, scene);

  const myDynamicTexture = new BABYLON.DynamicTexture(`cardDt-${suit}-${rank}`, MATERIAL_SIZE, scene, false);

  drawCardBySuitAndName(myDynamicTexture, MATERIAL_SIZE, suit, rank);

  const cardMaterial = new BABYLON.StandardMaterial(`cardMat-${suit}-${rank}`, scene);
  cardMaterial.diffuseColor = new Color3(240, 240, 240);
  cardMaterial.ambientTexture = myDynamicTexture;
  // cardMaterial.wireframe = true;

  card.material = cardMaterial;

  return card;
};

export const createAll = (scene: Scene, size = 10): Mesh[] => {
  const meshes: Mesh[] = [];
  for (const x of gridX) {
    for (const y of gridY) {
        meshes.push(createCard(scene, x, y, size));
    }
  }
  return meshes;
};
