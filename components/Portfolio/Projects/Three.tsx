// Option 2: Import just the parts you need.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React, { useState, useEffect } from "react";

const Planetarium = (props) => {
  const { isPlanetariumOpen } = props;

  const scene = new THREE.Scene();

  const clearScene = () => {
    console.log("Clearing scene", scene.children.length);
    while (scene.children.length > 0) {
      scene.remove.apply(scene, scene.children);
    }
  };

  // when callClearScene is caled from parent, clear the scene
  useEffect(() => {
    let renderer = new THREE.WebGLRenderer();
    console.log("isPlanetariumOpen");
    if (!isPlanetariumOpen) {
      console.log("Clearing scene from 3js");
      console.log(isPlanetariumOpen);
      clearScene();
      renderer.clear();
    } else {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;

      scene.background = new THREE.Color(0x414a4c);
      let camera = new THREE.PerspectiveCamera(
        60,
        innerWidth / innerHeight,
        1,
        1000
      );
      camera.position.set(0, 5, 0);
      renderer.setSize(innerWidth, innerHeight);
      document.body.appendChild(renderer.domElement);
      window.addEventListener("resize", (event) => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      });

      let controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;

      let gu = {
        time: { value: 0 },
      };

      let sizes = [] as number[];
      let shift = [] as number[];
      let pushShift = () => {
        shift.push(
          Math.random() * Math.PI,
          Math.random() * Math.PI * 2,
          (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
          Math.random() * 0.9 + 0.1
        );
      };
      let pts = new Array(1000).fill(0).map((p) => {
        sizes.push(Math.random() * 1.5 + 0.5);
        pushShift();
        return new THREE.Vector3()
          .randomDirection()
          .multiplyScalar(Math.random() * 0.5 + 9.5);
      });
      // for (let i = 0; i < 100000; i++) {
      //   let r = 10,
      //     R = 40;
      //   let rand = Math.pow(Math.random(), 1.5);
      //   let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
      //   pts.push(
      //     new THREE.Vector3().setFromCylindricalCoords(
      //       radius,
      //       Math.random() * 2 * Math.PI,
      //       (Math.random() - 0.5) * 2
      //     )
      //   );
      //   sizes.push(Math.random() * 1.5 + 0.5);
      //   pushShift();
      // }

      let g = new THREE.BufferGeometry().setFromPoints(pts);
      g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
      g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
      let m = new THREE.PointsMaterial({
        size: 0.125,
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        onBeforeCompile: (shader: any) => {
          shader.uniforms.time = gu.time;
          shader.vertexShader = `
          uniform float time;
          attribute float sizes;
          attribute vec4 shift;
          varying vec3 vColor;
          ${shader.vertexShader}
        `
            .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
            .replace(
              `#include <color_vertex>`,
              `#include <color_vertex>
            float d = length(abs(position) / vec3(40., 10., 40));
            d = clamp(d, 0., 1.);
            vColor = mix(vec3(4., 217., 255.), vec3(4., 217., 255.), d) / 255.;
          `
            )
            .replace(
              `#include <begin_vertex>`,
              `#include <begin_vertex>
            float t = time;
            float moveT = mod(shift.x + shift.z * t, PI2);
            float moveS = mod(shift.y + shift.z * t, PI2);
            transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
          `
            );
          //console.log(shader.vertexShader);
          shader.fragmentShader = `
          varying vec3 vColor;
          ${shader.fragmentShader}
        `
            .replace(
              `#include <clipping_planes_fragment>`,
              `#include <clipping_planes_fragment>
            float d = length(gl_PointCoord.xy - 0.5);
            //if (d > 0.5) discard;
          `
            )
            .replace(
              `vec4 diffuseColor = vec4( diffuse, opacity );`,
              `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
            );
          //console.log(shader.fragmentShader);
        },
      } as any);
      let p = new THREE.Points(g, m);
      p.rotation.order = "ZYX";
      p.rotation.z = 0.2;
      scene.add(p);

      let clock = new THREE.Clock();

      renderer.setAnimationLoop(() => {
        controls.update();
        let t = clock.getElapsedTime() * 0.5;
        gu.time.value = t * Math.PI;
        p.rotation.y = t * 0.05;
        renderer.render(scene, camera);
      });
    }
  }, [isPlanetariumOpen]);

  // useEffect(() => {
  //   const innerWidth = window.innerWidth;
  //   const innerHeight = window.innerHeight;

  //   scene.background = new THREE.Color(0x414a4c);
  //   let camera = new THREE.PerspectiveCamera(
  //     60,
  //     innerWidth / innerHeight,
  //     1,
  //     1000
  //   );
  //   camera.position.set(0, 5, 0);
  //   let renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(innerWidth, innerHeight);
  //   document.body.appendChild(renderer.domElement);
  //   window.addEventListener("resize", (event) => {
  //     camera.aspect = innerWidth / innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(innerWidth, innerHeight);
  //   });

  //   let controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableDamping = true;
  //   controls.enablePan = false;
  //   controls.enableZoom = false;

  //   let gu = {
  //     time: { value: 0 },
  //   };

  //   let sizes = [] as number[];
  //   let shift = [] as number[];
  //   let pushShift = () => {
  //     shift.push(
  //       Math.random() * Math.PI,
  //       Math.random() * Math.PI * 2,
  //       (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
  //       Math.random() * 0.9 + 0.1
  //     );
  //   };
  //   let pts = new Array(1000).fill(0).map((p) => {
  //     sizes.push(Math.random() * 1.5 + 0.5);
  //     pushShift();
  //     return new THREE.Vector3()
  //       .randomDirection()
  //       .multiplyScalar(Math.random() * 0.5 + 9.5);
  //   });
  //   // for (let i = 0; i < 100000; i++) {
  //   //   let r = 10,
  //   //     R = 40;
  //   //   let rand = Math.pow(Math.random(), 1.5);
  //   //   let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
  //   //   pts.push(
  //   //     new THREE.Vector3().setFromCylindricalCoords(
  //   //       radius,
  //   //       Math.random() * 2 * Math.PI,
  //   //       (Math.random() - 0.5) * 2
  //   //     )
  //   //   );
  //   //   sizes.push(Math.random() * 1.5 + 0.5);
  //   //   pushShift();
  //   // }

  //   let g = new THREE.BufferGeometry().setFromPoints(pts);
  //   g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
  //   g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
  //   let m = new THREE.PointsMaterial({
  //     size: 0.125,
  //     transparent: true,
  //     depthTest: false,
  //     blending: THREE.AdditiveBlending,
  //     onBeforeCompile: (shader: any) => {
  //       shader.uniforms.time = gu.time;
  //       shader.vertexShader = `
  //       uniform float time;
  //       attribute float sizes;
  //       attribute vec4 shift;
  //       varying vec3 vColor;
  //       ${shader.vertexShader}
  //     `
  //         .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
  //         .replace(
  //           `#include <color_vertex>`,
  //           `#include <color_vertex>
  //         float d = length(abs(position) / vec3(40., 10., 40));
  //         d = clamp(d, 0., 1.);
  //         vColor = mix(vec3(4., 217., 255.), vec3(4., 217., 255.), d) / 255.;
  //       `
  //         )
  //         .replace(
  //           `#include <begin_vertex>`,
  //           `#include <begin_vertex>
  //         float t = time;
  //         float moveT = mod(shift.x + shift.z * t, PI2);
  //         float moveS = mod(shift.y + shift.z * t, PI2);
  //         transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
  //       `
  //         );
  //       //console.log(shader.vertexShader);
  //       shader.fragmentShader = `
  //       varying vec3 vColor;
  //       ${shader.fragmentShader}
  //     `
  //         .replace(
  //           `#include <clipping_planes_fragment>`,
  //           `#include <clipping_planes_fragment>
  //         float d = length(gl_PointCoord.xy - 0.5);
  //         //if (d > 0.5) discard;
  //       `
  //         )
  //         .replace(
  //           `vec4 diffuseColor = vec4( diffuse, opacity );`,
  //           `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
  //         );
  //       //console.log(shader.fragmentShader);
  //     },
  //   } as any);
  //   let p = new THREE.Points(g, m);
  //   p.rotation.order = "ZYX";
  //   p.rotation.z = 0.2;
  //   scene.add(p);

  //   let clock = new THREE.Clock();

  //   renderer.setAnimationLoop(() => {
  //     controls.update();
  //     let t = clock.getElapsedTime() * 0.5;
  //     gu.time.value = t * Math.PI;
  //     p.rotation.y = t * 0.05;
  //     renderer.render(scene, camera);
  //   });
  // }, []);

  return <div></div>;
};
export default Planetarium;
