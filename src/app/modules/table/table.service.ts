import {Injectable} from '@angular/core';
import {Color3, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial} from '@babylonjs/core';
import {WoodProceduralTexture} from '@babylonjs/procedural-textures';

@Injectable({providedIn: 'root'})
export class TableService {

  public constructor() {
  }

  public createTable(scene: Scene, size = 50): Mesh {

    const ground: Mesh = MeshBuilder.CreateGround('ground1', {width: size, height: size}, scene);

    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, {
      mass: 0,
      friction: 0.5,
      restitution: 0.7
    }, scene);

    const material = new StandardMaterial(`tableMat`, scene);

    material.ambientColor = new Color3(1, 1, 1);
    material.diffuseColor = new Color3(0.8, 0.8, 0.8);

    const woodTexture = new WoodProceduralTexture('tableText', 4096, scene);
    woodTexture.ampScale = size * 20;
    woodTexture.woodColor = Color3.FromInts(149, 73, 22);
    material.diffuseTexture = woodTexture;

    ground.material = material;

    return ground;
  }
}
