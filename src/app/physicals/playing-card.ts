import {Mesh, MeshBuilder, StandardMaterial, Texture} from 'babylonjs';
import {Scene} from 'babylonjs/scene';
import {Vector4} from 'babylonjs/babylon';

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);

export const createCard = (scene: Scene, name: string, size = 10): Mesh => {

  const card = MeshBuilder.CreatePlane(name, {
    width: size * 0.7,
    height: size,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: vectorToFrontSide,
    backUVs: vectorToBackSide
  }, scene);

  // create the material with its texture for the sphere and assign it to the sphere
  const cardMaterial = new StandardMaterial('card', scene);
  cardMaterial.diffuseTexture = new Texture('assets/textures/card.jpg', scene);
  card.material = cardMaterial;

  return card;
};
