import React, { useEffect, useRef, useState } from 'react';
import { Maths } from '../../utils/Maths';
import styles from './particles.module.scss';
import * as options from './ParticleOptions';

class Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;

  size: number;

  constructor(windowWidth: number, windowHeight: number) {
    this.x = Maths.Random(0, windowWidth);
    this.y = Maths.Random(0, windowHeight);

    this.size = Maths.Random(
      options.PARTICLE_MIN_RADIUS,
      options.PARTICLE_MAX_RADIUS
    );

    this.dx = Maths.Random(
      -(options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED),
      options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED
    );
    this.dy = Maths.Random(
      -(options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED),
      options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED
    );
  }

  move(windowWidth: number, windowHeight: number, deltaTime: number) {
    this.x += this.dx * deltaTime;
    this.y += this.dy * deltaTime;

    var half = this.size / 2;

    if (this.x - half < 0) {
      this.x = half + 1;
      this.dx *= -1;
    }

    if (this.y - half < 0) {
      this.y = half + 1;
      this.dy *= -1;
    }

    if (this.x + half > windowWidth) {
      this.x = windowWidth - half - 1;
      this.dx *= -1;
    }

    if (this.y + half > windowHeight) {
      this.y = windowHeight - half - 1;
      this.dy *= -1;
    }

    if (this.dx > options.PARTICLE_MAX_SPEED) {
      this.dx = Math.min(options.PARTICLE_MAX_SPEED, this.dx);
    }

    if (this.dy > options.PARTICLE_MAX_SPEED) {
      this.dy = Math.min(options.PARTICLE_MAX_SPEED, this.dy);
    }
  }

  dist(neighborX: number, neighborY: number) {
    return Math.pow(this.x - neighborX, 2) + Math.pow(this.y - neighborY, 2);
  }
}

export default function Particles() {
  const particles = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousTime = useRef<number>(0);
  const [visibility, setVisibility] = useState<boolean>(true);
  let mousePosition = { x: 0, y: 0 };
  let animationId = 0;

  useEffect(() => {
    resizeCanvas();
    generateParticles();
    animationId = window.requestAnimationFrame(updateFrame);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  function onMouseMove(event: MouseEvent) {
    mousePosition = { x: event.clientX, y: event.clientY };
  }

  function updateFrame(currentTime: number) {
    resizeCanvas();
    drawParticles(currentTime);
    animationId = window.requestAnimationFrame(updateFrame);
  }

  function drawParticles(currentTime: number) {
    var ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const deltaTime = currentTime / 100 - previousTime.current;
    previousTime.current = currentTime / 100;

    if (deltaTime > 1) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // ctx.fillStyle = 'hsl(50, 40%, 25%, 0.5)';

    // ctx.beginPath();
    // ctx.arc(
    //   mousePosition.x,
    //   mousePosition.y,
    //   Math.sqrt(options.MOUSE_RADIUS),
    //   0,
    //   Math.PI * 2
    // );
    // ctx.fill();

    ctx.fillStyle = 'hsl(120, 40%, 25%)';

    for (var i = 0; i < particles.current.length; i++) {
      var particle = particles.current[i];

      for (var j = 0; j < particles.current.length; j++) {
        var neighbor = particles.current[j];

        if (
          Math.abs(particle.x - neighbor.x) > options.PARTICLE_LINE_THRESHOLD ||
          Math.abs(particle.y - neighbor.y) > options.PARTICLE_LINE_THRESHOLD ||
          particle === neighbor
        ) {
          continue;
        }

        var dist = neighbor.dist(particle.x, particle.y);
        if (dist <= options.PARTICLE_LINE_THRESHOLD) {
          var opacity = 0.7 - dist / options.PARTICLE_LINE_THRESHOLD;
          ctx.strokeStyle = `hsl(120, 40%, 25%, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.stroke();
        }
      }

      var mouseDist = particle.dist(mousePosition.x, mousePosition.y);

      if (mouseDist <= options.MOUSE_RADIUS) {
        var factor = 1 - mouseDist / options.MOUSE_RADIUS;
        particle.dx += (1 * (particle.x - mousePosition.x) * factor) / 250;
        particle.dy += (1 * (particle.y - mousePosition.y) * factor) / 250;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      particle.move(ctx.canvas.width, ctx.canvas.height, deltaTime);
    }
  }

  function resizeCanvas() {
    const windowWidth = containerRef?.current?.clientWidth;

    const windowHeight = containerRef?.current?.clientHeight;

    if (!windowHeight || !windowWidth || !canvasRef?.current) return;

    if (
      windowWidth !== canvasRef?.current.width ||
      windowHeight !== canvasRef?.current.height
    ) {
      canvasRef.current.width = windowWidth;
      canvasRef.current.height = windowHeight;
    }
  }

  function generateParticles() {
    const windowWidth = containerRef.current?.clientWidth;
    const windowHeight = containerRef.current?.clientHeight;

    if (!windowHeight || !windowWidth) return;

    let arr = [];
    for (var i = 0; i < options.PARTICLE_COUNT; i++) {
      arr.push(new Particle(windowWidth, windowHeight));
    }

    particles.current = arr;
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}>
      <canvas ref={canvasRef} />
    </div>
  );
}
