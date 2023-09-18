import { RainDropsType } from './types';

const initCanvasRain = () => {
  const canvas = document.getElementById('rain') as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');

  function randomNum(max: number, min: number) {
    return Math.floor(Math.random() * max) + min;
  }

  class RainDrops implements RainDropsType {
    constructor(
      public x: number,
      public y: number,
      public endy: number,
      public velocity: number,
      public opacity: number
    ) {
      this.x = x;
      this.y = y;
      this.endy = endy;
      this.velocity = velocity;
      this.opacity = opacity;
    }

    draw = () => {
      if (c) {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - this.endy);
        c.lineWidth = 1;
        c.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        c.stroke();
      }
    };

    update = () => {
      const rainEnd = window.innerHeight + 100;
      if (this.y >= rainEnd) {
        this.y = this.endy - 100;
      } else {
        this.y += this.velocity;
      }
      this.draw();
    };
  }

  const rainArray: RainDropsType[] = [];

  for (let i = 0; i < 140; i += 1) {
    const rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
    const rainYLocation = Math.random() * -500;
    const randomRainHeight = randomNum(10, 2);
    const randomSpeed = randomNum(20, 0.2);
    const randomOpacity = Math.random() * 0.55;
    const rainParameters = new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity);
    rainArray.push(rainParameters);
  }

  function animateRain() {
    requestAnimationFrame(animateRain);
    if (c) {
      c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    for (let i = 0; i < rainArray.length; i += 1) {
      rainArray[i].update();
    }
  }
  animateRain();
};

export default initCanvasRain;
