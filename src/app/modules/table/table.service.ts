import {Injectable} from '@angular/core';
import {Color3, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Vector3} from '@babylonjs/core';
import {WoodProceduralTexture} from '@babylonjs/procedural-textures';

@Injectable({providedIn: 'root'})
export class TableService {

  public constructor() {
  }

  public createTable(scene: Scene, size = 50): Mesh {

    const ground: Mesh = MeshBuilder.CreateBox('ground1', {width: size, height: 1, depth: size}, scene);

    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, {
      mass: 0,
      friction: 0.5,
      restitution: 0,
    }, scene);

    const material = new StandardMaterial(`tableMat`, scene);

    material.ambientColor = new Color3(1, 1, 1);
    material.diffuseColor = new Color3(0.8, 0.8, 0.8);

    const woodTexture = new WoodProceduralTexture('tableText', 4096, scene);
    woodTexture.ampScale = size * 20;
    woodTexture.woodColor = Color3.FromInts(149, 73, 22);
    material.diffuseTexture = woodTexture;

    ground.material = material;
    ground.position.x = 0;
    ground.position.y = 0;
    ground.position.z = 0;
    ground.rotation = new Vector3(0, 0, 0);

    return ground;
  }
}
