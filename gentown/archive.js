for (let x = 0; x < planetWidth; x++) {
    planetOld.push([]);
    for (let y = 0; y < planetHeight; y++) {
      // planet[x].push(choose(["#ff0000","#00ff00","#0000ff"]));
      let value = generatePerlinNoise(x / 40, y / 40, 5, 0.5);
      // value = Math.max(0,value);
      // value = (value+1) / 2;

      // normalize to 0-1
      value = (value - noiseMin) / (noiseMax - noiseMin);

      value = Math.max(0,value);
      value = Math.min(1,value);

      // Calculate distance from the edge of the map
      let distanceToEdge = Math.min(x+1, y+1, planetWidth - x, planetHeight - y);
          
      // Apply a falloff function to make borders low elevation
      let falloff = distanceToEdge / (Math.min(planetWidth, planetHeight) / 10);  // Distance-based falloff
      falloff = Math.min(1, falloff);  // Ensure falloff is between 0 and 1

      // Blend the perlin noise with the falloff
      value *= falloff

      // lower resolution
      value = Math.ceil(value * 10) / 10;

      // console.log(value);
      planetOld[x].push(value);
    }
  }
  planetOld[0][0] = 0.99;
  planetOld[planetWidth-1][planetHeight-1] = 0.99;
  mapCanvas.width = planetWidth*pixelSize;
  mapCanvas.height = planetHeight*pixelSize;

function renderOld() {
    for (let x = 0; x < planetWidth; x++) {
      for (let y = 0; y < planetHeight; y++) {
        // ctx.fillStyle = planet[x][y];
        // ctx.fillStyle = "hsl(0,0%,"+planet[x][y]*360+"%)";
        let value = planetOld[x][y];
        if (value < 0.45) {
          value += 0.5;
          let c = l[Math.min(l.length-1,Math.floor(value*(l.length)))];
          ctx.fillStyle = c;
          // if (value < 0.1) ctx.fillStyle = "#ffffff"
        }
        else if (value === 1) {
          ctx.fillStyle = "#ffffff"
        }
        else {
          ctx.fillStyle = "rgb(0,"+Math.max(0,value*256+50)+","+Math.abs(Math.min(0,value*256))+")";
        }
        // console.log(ctx.fillStyle);
        ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize); 
      }
    }
  }

          // else if (value === 1) {
          //   ctx.fillStyle = "#ffffff"
          // }
          // else {
          //   ctx.fillStyle = "rgb(0,"+Math.max(0,value*256+50)+","+Math.abs(Math.min(0,value*256))+")";
          // }
          // console.log(ctx.fillStyle);