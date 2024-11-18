"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { mat4 } from "gl-matrix";

function WebGLCube() {
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {}, []);

  useEffect(() => {
    if (canvasElRef.current) {
      const canvas = canvasElRef.current;
      const gl = canvas.getContext("webgl");

      if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        return;
      }

      //세이더 컴파일
      const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);

      // 셰이더 프로그램
      const program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      // 큐브 정점 데이터
      const vertices = new Float32Array([
        -1,
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        1,
        -1,
        -1,
        1,
        -1, // 뒷면
        -1,
        -1,
        1,
        1,
        -1,
        1,
        1,
        1,
        1,
        -1,
        1,
        1, // 앞면
      ]);

      // 버텍스 버퍼 설정
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, "position");
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionLocation);

      // 모델 뷰 행렬과 투영 행렬 설정
      const modelViewMatrix = mat4.create();
      const projectionMatrix = mat4.create();
      mat4.perspective(
        projectionMatrix,
        Math.PI / 4,
        canvas.width / canvas.height,
        0.1,
        100.0
      );
      mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -6]);

      const modelViewMatrixLocation = gl.getUniformLocation(
        program,
        "modelViewMatrix"
      );
      const projectionMatrixLocation = gl.getUniformLocation(
        program,
        "projectionMatrix"
      );

      gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
      gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

      // 애니메이션 루프
      const render = () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, 0.01);
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 3);
        requestAnimationFrame(render);
      };

      gl.clearColor(0, 0, 0, 1);
      gl.enable(gl.DEPTH_TEST);
      render();
    }
  }, []);

  return (
    <canvas
      ref={canvasElRef}
      width={typeof window !== "undefined" ? window.innerWidth : 800}
      height={typeof window !== "undefined" ? window.innerHeight : 600}
    ></canvas>
  );
}

export default WebGLCube;

// 정점 셰이더
const vertexShaderSource = `
 attribute vec3 position;
 uniform mat4 modelViewMatrix;
 uniform mat4 projectionMatrix;
 void main() {
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
`;

// 프래그먼트 셰이더
const fragmentShaderSource = `
 precision mediump float;
 void main() {
   gl_FragColor = vec4(0.2, 0.7, 0.5, 1.0);
 }
`;
