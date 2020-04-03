import {Vector4} from 'babylonjs/babylon';
import Scene = BABYLON.Scene;
import {RANK, SUIT} from './constants';

// front image = half the whole image along the width
const vectorToFrontSide = new Vector4(0.5, 0, 1, 1);
// back image = second half along the width
const vectorToBackSide = new Vector4(0, 0, 0.5, 1);

const materialWidth = 183;
const materialHeight = 275;

export const createCard = (scene: Scene, suit: SUIT, rank: RANK, size = 10): BABYLON.Mesh => {

  const card = BABYLON.MeshBuilder.CreatePlane(rank, {
    width: size * 0.5,
    height: size,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: vectorToFrontSide,
    backUVs: vectorToBackSide
  }, scene);

  const myDynamicTexture = new BABYLON.DynamicTexture(`cardDt-${suit}-${rank}`, 2 * materialWidth, scene, false);
  const ctx = myDynamicTexture.getContext();

  const backSide = new Image();
  backSide.src = 'assets/textures/card_back.jpg';

  backSide.onload = () => {
    ctx.drawImage(backSide, 0, 0, materialWidth, materialHeight, 0, 0, materialWidth, materialHeight);
    myDynamicTexture.update();
  };

  drawCardBySuitAndName(myDynamicTexture, suit, rank);

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
  horizontal: 40,
  vertical: 60,
};

const gridX = [SUIT.SPADES, SUIT.HEARTS, SUIT.DIAMONDS, SUIT.CLUBS];
// tslint:disable-next-line:max-line-length
const gridY = [RANK.ACE, RANK.TWO, RANK.THREE, RANK.FOUR, RANK.FIVE, RANK.SIX, RANK.SEVEN, RANK.EIGHT, RANK.NINE, RANK.TEN, RANK.JACK, RANK.QUEEN, RANK.KING];

function drawCardBySuitAndName(dynTexture: BABYLON.DynamicTexture, suit: SUIT, rank: RANK) {
  const grid = {x: gridY.indexOf(rank), y: gridX.indexOf(suit)};
  if (grid.x === -1) {
    grid.x = 0;
  }
  if (grid.y === -1) {
    grid.y = 0;
  }
  const ctx = dynTexture.getContext();
  const texturePack = new Image();
  texturePack.src = 'assets/textures/playing_cards_textures.svg';
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
