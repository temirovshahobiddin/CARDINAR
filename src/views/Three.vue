<template>
    <div ref="canvasContainer" @mouseenter="startAnimation" @mouseleave="stopAnimation"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    mounted() {
      // Создание сцены
      const scene = new THREE.Scene();
  
      // Создание камеры
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
  
      // Создание рендерера
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.canvasContainer.appendChild(renderer.domElement);
  
      // Создание геометрии и материала для объекта
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xFFF });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      // Флаг для управления анимацией
      let isAnimating = false;
  
      // Функция анимации
      function animate() {
        if (!isAnimating) return;
  
        requestAnimationFrame(animate);
  
        // Вращение куба
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        // Обновление рендерера
        renderer.render(scene, camera);
      }
  
      // Запуск анимации при наведении мыши
      this.startAnimation = () => {
        isAnimating = true;
        animate();
      };
  
      // Остановка анимации при уходе мыши
      this.stopAnimation = () => {
        isAnimating = false;
      };
  
      // Запуск анимации при монтировании компонента
      this.startAnimation();
    },
  };
  </script>
  
  <style>
  canvas {
    display: block;
  }
  </style>
  