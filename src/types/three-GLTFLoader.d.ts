declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader, LoadingManager, Group } from 'three';
    import { AnimationClip } from 'three';
    
    export class GLTFLoader extends Loader {
      constructor(manager?: LoadingManager);
      load(
        url: string,
        onLoad: (gltf: GLTF) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      parse(
        data: ArrayBuffer | string,
        path: string,
        onLoad: (gltf: GLTF) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      setDRACOLoader(dracoLoader: any): this;
    }
  
    export interface GLTF {
      animations: AnimationClip[];
      scene: Group;
      scenes: Group[];
      cameras: any[];
      asset: any;
    }
  }
  