import {RANK, SUIT} from './constants';
import {Dimension} from '../dimension';

const backSideTextureSrc = 'assets/textures/card_back.jpg';
const texturePackSrc = 'assets/textures/playing_cards_textures.svg';

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

export const gridX = [SUIT.SPADES, SUIT.HEARTS, SUIT.DIAMONDS, SUIT.CLUBS];
// tslint:disable-next-line:max-line-length
export const gridY = [RANK.ACE, RANK.TWO, RANK.THREE, RANK.FOUR, RANK.FIVE, RANK.SIX, RANK.SEVEN, RANK.EIGHT, RANK.NINE, RANK.TEN, RANK.JACK, RANK.QUEEN, RANK.KING];

export const drawCardBySuitAndName = (dynTexture: BABYLON.DynamicTexture, materialDimension: Dimension, suit: SUIT, rank: RANK) => {
  // Get position of card in texture pack, when in doubt use {0, 0}
  const grid = {x: gridY.indexOf(rank), y: gridX.indexOf(suit)};
  if (grid.x === -1) {
    grid.x = 0;
  }
  if (grid.y === -1) {
    grid.y = 0;
  }
  const ctx = dynTexture.getContext();

  // Draw backside of texture
  const backSide = new Image();
  backSide.src = backSideTextureSrc;
  backSide.onload = () => {
    ctx.drawImage(backSide,
      0, 0, materialDimension.width, materialDimension.height,
      0, 0, materialDimension.width, materialDimension.height);
    dynTexture.update();
  };

  // Draw frontside
  const texturePack = new Image();
  texturePack.src = texturePackSrc;
  texturePack.onload = () => {
    const offsetLeft = baseOffset.left + grid.x * (cardTexture.width + split.horizontal);
    const offsetTop = baseOffset.top + grid.y * (cardTexture.height + split.vertical);
    ctx.drawImage(
      texturePack,
      offsetLeft, // image start x
      offsetTop, // image start y
      cardTexture.width, // image width
      cardTexture.height, // image height
      materialDimension.width, // canvas to x
      0,
      materialDimension.width, // destination width
      materialDimension.height, // destination height
    );
    dynTexture.update();
  };
};
