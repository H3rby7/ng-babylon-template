import {WindowRefService} from '../services/window-ref.service';
import {ElementRef, Injectable, NgZone} from '@angular/core';
import 'babylonjs-materials';
import {createAll} from '../physicals/playing-card/playing-card';
import Scene = BABYLON.Scene;
import Engine = BABYLON.Engine;
import Mesh = BABYLON.Mesh;
import FreeCamera = BABYLON.FreeCamera;
import Light = BABYLON.Light;
import Color4 = BABYLON.Color4;
import Vector3 = BABYLON.Vector3;
import DynamicTexture = BABYLON.DynamicTexture;
import StandardMaterial = BABYLON.StandardMaterial;
import Color3 = BABYLON.Color3;
import HemisphericLight = BABYLON.HemisphericLight;

const size = 3;

@Injectable({providedIn: 'root'})
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private camera: FreeCamera;
  private scene: Scene;
  private light: Light;

  private cards: Mesh[];

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) {
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    // Then, load the Babylon 3D engine:
    this.engine = new Engine(this.canvas, true);

    // create a basic BJS Scene object
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);

    // create a FreeCamera, and set its position to (x:5, y:10, z:-20 )
    this.camera = new FreeCamera('camera1', new Vector3(-20, 20, -30), this.scene);

    // target the camera to scene origin
    this.camera.setTarget(Vector3.Zero());

    // attach the camera to the canvas
    this.camera.attachControl(this.canvas, false);

    this.light = new HemisphericLight('light1', new Vector3(0, 0, -1), this.scene);
    this.light = new HemisphericLight('light2', new Vector3(0, 0, 1), this.scene);

    this.cards = createAll(this.scene, size);
    this.layoutToGrid();

    // generates the world x-y-z axis for better understanding
    this.showWorldAxis(8);
  }

  // Create a nice grid and flip every second card
  public layoutToGrid() {
    console.log('grid layout');
    for (let i = 0; i < this.cards.length; i++) {
      const mesh = this.cards[i];
      const x = (i % 13);
      const y = Math.floor(i / 13 % 4);
      mesh.position.x = x * size;
      mesh.position.y = y * (size + 1);
      mesh.rotation = new Vector3(0, (x + y) % 2 === 0 ? Math.PI : 0, 0);
    }
  }

  // Create a deck
  public layoutToDeck() {
    console.log('deck layout');
    for (let i = 0; i < this.cards.length; i++) {
      const mesh = this.cards[i];
      mesh.rotation = new Vector3(-0.5 * Math.PI, 0, 0);
      mesh.position.y = 0.01 * i;
      mesh.position.x = 0;
    }
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }

  /**
   * creates the world axes
   *
   * Source: https://doc.babylonjs.com/snippets/world_axes
   *
   * @param size number
   */
  public showWorldAxis(size: number): void {

    const makeTextPlane = (text: string, color: string, textSize: number) => {
      const dynamicTexture = new DynamicTexture('DynamicTexture', 50, this.scene, true);
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
      const plane = Mesh.CreatePlane('TextPlane', textSize, this.scene, true);
      const material = new StandardMaterial('TextPlaneMaterial', this.scene);
      material.backFaceCulling = false;
      material.specularColor = new BABYLON.Color3(0, 0, 0);
      material.diffuseTexture = dynamicTexture;
      plane.material = material;

      return plane;
    };

    const axisX = Mesh.CreateLines(
      'axisX',
      [
        Vector3.Zero(),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this.scene
    );

    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane('X', 'red', size / 10);
    xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = Mesh.CreateLines(
      'axisY',
      [
        Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
      ],
      this.scene
    );

    axisY.color = new Color3(0, 1, 0);
    const yChar = makeTextPlane('Y', 'green', size / 10);
    yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

    const axisZ = Mesh.CreateLines(
      'axisZ',
      [
        Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
      ],
      this.scene
    );

    axisZ.color = new Color3(0, 0, 1);
    const zChar = makeTextPlane('Z', 'blue', size / 10);
    zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
  }
}
