import React, { useEffect, useRef, useState } from 'react';
import { Maths } from '../../utils/Maths';
import styles from './particles.module.scss';
import * as options from './ParticleOptions';

class Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  windowHeight: number;
  windowWidth: number;
  size: number;

  constructor(windowWidth: number, windowHeight: number) {
    this.x = Maths.Random(0, windowWidth);
    this.y = Maths.Random(0, windowHeight);
    this.size = Maths.Random(
      options.PARTICLE_MIN_RADIUS,
      options.PARTICLE_MAX_RADIUS
    );
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;
    this.dx = Maths.Random(
      -(options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED) / 10,
      (options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED) / 10
    );
    this.dy = Maths.Random(
      -(options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED) / 10,
      (options.PARTICLE_MAX_SPEED - options.PARTICLE_MIN_SPEED) / 10
    );
  }

  move(windowWidth: number, windowHeight: number) {
    this.x += this.dx;
    this.y += this.dy;

    var half = this.size / 2;

    if (this.x - half < 0 || this.x + half >= windowWidth) {
      this.dx *= -1;
    }

    if (this.y - half < 0 || this.y + half >= windowHeight) {
      this.dy *= -1;
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

  useEffect(() => {
    generateParticles();
    updateFrame();
  }, []);

  function updateFrame() {
    drawParticles();
    resizeCanvas();
    window.requestAnimationFrame(updateFrame);
  }

  function drawParticles() {
    var ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'hsl(120, 40%, 25%)';

    for (var i = 0; i < particles.current.length; i++) {
      var particle = particles.current[i];

      for (var j = 0; j < particles.current.length; j++) {
        var neighbor = particles.current[j];

        var dist = neighbor.dist(particle.x, particle.y);
        if (dist <= options.PARTICLE_LINE_THRESHOLD) {
          var opacity = 1 - dist / options.PARTICLE_LINE_THRESHOLD;
          ctx.strokeStyle = `hsl(120, 40%, 25%, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      particle.move(ctx.canvas.width, ctx.canvas.height);
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

      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].windowHeight = windowHeight;
        particles.current[i].windowWidth = windowWidth;
      }
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
