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

  const img = new Image();
  img.src = 'assets/textures/card.jpg';
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    myDynamicTexture.update();
  };
  // create the material with its texture for the sphere and assign it to the sphere
  // const cardMaterial = new BABYLON.StandardMaterial('card', scene);
  // cardMaterial.ambientTexture = new Texture('assets/textures/card.jpg', scene);

  const cardMaterial = new BABYLON.StandardMaterial('cardMat', scene);
  cardMaterial.ambientTexture = myDynamicTexture;

  card.material = cardMaterial;

  return card;
};
