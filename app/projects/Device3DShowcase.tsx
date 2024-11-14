"use client";
import { useEffect, useRef } from "react";
// @ts-expect-error: Type mismatch due to library typing issue
import { ContactShadowGroundPlugin, IObject3D, LoadingScreenPlugin, ProgressivePlugin, SSAAPlugin, ThreeViewer } from "threepipe";
// @ts-expect-error: Type mismatch due to library typing issue
import { TweakpaneUiPlugin } from "@threepipe/plugin-tweakpane";
import { Button } from "@nextui-org/button";

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
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}

const init = async (canvas: HTMLCanvasElement) => {
  const viewer = new ThreeViewer({
    // The canvas element where the scene will be rendered
    canvas,
    // Enable/Disable MSAA
    msaa: false,
    // Set the render scale automatically based on the device pixel ratio
    renderScale: "auto",
    // Enable/Disable tone mapping
    tonemap: true,
    // Add some plugins
    plugins: [
      // Show a loading screen while the model is downloading
      LoadingScreenPlugin,
      // Enable progressive rendering and SSAA
      ProgressivePlugin,
      SSAAPlugin,
      // Add a ground with contact shadows
      ContactShadowGroundPlugin,
    ],
  });

  // Add a plugin with a debug UI for tweaking parameters
  const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));

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
