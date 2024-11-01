"use client";

import { useEffect, useRef } from "react";
// @ts-expect-error: Type mismatch due to library typing issue
import { ThreeViewer } from "threepipe";
// import { TweakpaneUiPlugin } from "@threepipe/plugin-tweakpane";

export default function Device3DShowcase() {
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasElRef.current) {
      init(canvasElRef.current);
    }
  }, []);

  return (
    <div id="canvas-container">
      <canvas ref={canvasElRef}></canvas>
    </div>
  );
}

const init = async (canvas: HTMLCanvasElement) => {
  const viewer = new ThreeViewer({
    canvas,
    msaa: false,
    renderScale: "auto",
    tonemap: true,
    // dropzone: {
    //   allowedExtensions: ["png", "jpeg", "jpg", "webp", "svg", "hdr", "exr"],
    //   autoImport: true,
    //   addOptions: {
    //     disposeSceneObjects: false,
    //     autoSetBackground: false,
    //     autoSetEnvironment: true, // when hdr, exr is dropped
    //   },
    // },
    plugins: [
      // LoadingScreenPlugin,
      // ProgressivePlugin,
      // SSAAPlugin,
      // ContactShadowGroundPlugin,
      // // PickingPlugin,
      // // PopmotionPlugin,
      // // CameraViewPlugin,
      // // TransformAnimationPlugin,
      // // new TransformControlsPlugin(false),
      // // CanvasSnapshotPlugin,
      // // ContactShadowGroundPlugin,
    ],
  });

  // const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));

  //Threepipe는 온라인 에디터를 제공하여 장면을 빠르게 구성하고, 플러그인 및 객체 속성을 설정할 수 있습니다.
  //https://threepipe.org/examples/tweakpane-editor/

  // await viewer.setEnvironmentMap("https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr", {
  //   setBackground: false,
  // });

  // const result = await viewer.load<IObject3D>("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf", {
  //   autoCenter: true,
  //   autoScale: true,
  // });

  // // Add some debug UI elements for tweaking parameters
  // ui.setupPlugins(SSAAPlugin);
  // ui.appendChild(viewer.scene.uiConfig);
  // ui.appendChild(viewer.scene.mainCamera.uiConfig);

  // Every object, material, etc has a UI config that can be added to the UI to configure it.
  // const model = result?.getObjectByName("node_damagedHelmet_-6514");
  // if (model) ui.appendChild(model.uiConfig, { expanded: false });
};
