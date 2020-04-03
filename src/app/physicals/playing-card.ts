import {Vector4} from 'babylonjs/babylon';
import Scene = BABYLON.Scene;

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);

export const createCard = (scene: Scene, name: string, size = 10): BABYLON.Mesh => {

  const card = BABYLON.MeshBuilder.CreatePlane(name, {
    width: size * 0.5,
    height: size,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: vectorToFrontSide,
    backUVs: vectorToBackSide
  }, scene);

  const myDynamicTexture = new BABYLON.DynamicTexture('cardDt', 366, scene, false);
  const ctx = myDynamicTexture.getContext();

  const backSide = new Image();
  backSide.src = 'assets/textures/card_back.jpg';
  backSide.onload = () => {
    ctx.drawImage(backSide, 0, 0, 183, 275, 0, 0, 183, 275);
    myDynamicTexture.update();
  };

  const frontSide = new Image();
  frontSide.src = 'assets/textures/card_diamonds_9.jpg';
  frontSide.onload = () => {
    ctx.drawImage(frontSide, 0, 0, 183, 275, 183, 0, 183, 275);
    myDynamicTexture.update();
  };

  const cardMaterial = new BABYLON.StandardMaterial('cardMat', scene);
  cardMaterial.ambientTexture = myDynamicTexture;

  card.material = cardMaterial;

  return card;
};
