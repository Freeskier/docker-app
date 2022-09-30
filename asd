.App {
  font-family: sans-serif;
  text-align: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(https://steamuserimages-a.akamaihd.net/ugc/785230361343977676/CDDE77CB810474E1C07B945E40AE4713141AFD76/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false);
}

.test {
  position: absolute;

  width: 90%;
  height: 90%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-mask-image: radial-gradient(
    circle at 50% 50%,
    transparent 30%,
    black 0%
  );
  mask-image: radial-gradient(black 20px, rgba(0, 0, 0, 0.6) 20px),
    linear-gradient(#fff 0 0);
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
  mask-size: 30px 30px;
  -webkit-mask-size: 5px 5px;
  -webkit-mask-composite: xor;
  mask-composite: xor;
  z-index: 2;
}

.dwa {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 100px;
  top: 100px;
  background-color: limegreen;
  z-index: 1;
  animation: rot 2s linear infinite;
}

@keyframes rot {
  0% {
    transform: rotate(90deg);
  }
  100% {
    rotatez: 360deg;
  }
}
