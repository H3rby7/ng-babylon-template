import {Vector4} from 'babylonjs/babylon';
import Scene = BABYLON.Scene;

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);

const materialWidth = 183;
const materialHeight = 275;

export const createCard = (scene: Scene, suit: string, name: string, size = 10): BABYLON.Mesh => {

  const card = BABYLON.MeshBuilder.CreatePlane(name, {
    width: size * 0.5,
    height: size,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: vectorToFrontSide,
    backUVs: vectorToBackSide
  }, scene);

  const myDynamicTexture = new BABYLON.DynamicTexture(`cardDt-${suit}-${name}`, 2 * materialWidth, scene, false);
  const ctx = myDynamicTexture.getContext();

  const backSide = new Image();
  backSide.src = 'assets/textures/card_back.jpg';

  backSide.onload = () => {
    ctx.drawImage(backSide, 0, 0, materialWidth, materialHeight, 0, 0, materialWidth, materialHeight);
    myDynamicTexture.update();
  };

  drawCardBySuitAndName(myDynamicTexture, suit, name);

  const cardMaterial = new BABYLON.StandardMaterial('cardMat', scene);
  cardMaterial.ambientTexture = myDynamicTexture;

  card.material = cardMaterial;

  return card;
};

// *************** Related to the Card Texture Pack ***************
const cardTexture = {
  width: 350,
  height: 510,
};
const baseOffset = {
  left: 35,
  top: 45,
};
const split = {
  horizontal: 42,
  vertical: 60,
};

function drawCardBySuitAndName(dynTexture: BABYLON.DynamicTexture, suit: string, name: string) {
  const ctx = dynTexture.getContext();
  const texturePack = new Image();
  texturePack.src = 'assets/textures/playing_cards_textures.svg';
  const grid = {x: 12, y: 3};
  texturePack.onload = () => {
    const offsetLeft = baseOffset.left + grid.x * (cardTexture.width + split.horizontal);
    const offsetTop = baseOffset.top + grid.y * (cardTexture.height + split.vertical);
    ctx.drawImage(
      texturePack,
      offsetLeft, // image start x
      offsetTop, // image start y
      cardTexture.width, // image width
      cardTexture.height, // image height
      materialWidth, // canvas to x
      0,
      materialWidth, // destination width
      materialHeight, // destination height
    );
    dynTexture.update();
  };
}
