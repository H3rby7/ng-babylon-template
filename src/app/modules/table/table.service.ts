import {Injectable} from '@angular/core';
import 'babylonjs-materials';
import 'babylonjs-procedural-textures';
import Scene = BABYLON.Scene;
import Mesh = BABYLON.Mesh;
import Color3 = BABYLON.Color3;

@Injectable({providedIn: 'root'})
export class TableService {

  public constructor() {
  }

  public createTable(scene: Scene, size = 50): Mesh {

    const ground: Mesh = BABYLON.MeshBuilder.CreateGround('ground1', {width: size, height: size}, scene);

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {
      mass: 0,
      friction: 0.5,
      restitution: 0.7
    }, scene);

    const material = new BABYLON.StandardMaterial(`tableMat`, scene);

    material.ambientColor = new Color3(1, 1, 1);
    material.diffuseColor = new Color3(0.8, 0.8, 0.8);

    const woodTexture = new BABYLON.WoodProceduralTexture('tableText', 4096, scene);
    woodTexture.ampScale = size * 20;
    woodTexture.woodColor = Color3.FromInts(149, 73, 22);
    material.diffuseTexture = woodTexture;

    ground.material = material;

    return ground;
  }
}
