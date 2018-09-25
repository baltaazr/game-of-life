var map, playBool

function setup() {
  maxX = Math.floor(windowWidth / 10) - 15
  maxY = Math.floor(windowHeight / 10)
  map = []
  playBool = false
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < Math.floor(maxY / 2); i++) {
    map.push(new Array(Math.floor(maxX / 2)).fill(false))
  }
  nextButton = createButton('Next');
  nextButton.position(windowWidth - 150, 10);
  nextButton.mouseClicked(next);
  sliderX = createSlider(1, maxX, Math.floor(maxX / 2));
  sliderX.position(windowWidth - 150, 40);
  sliderY = createSlider(1, maxY, Math.floor(maxY / 2));
  sliderY.position(windowWidth - 150, 70);
  playButton = createButton('Play/Stop');
  playButton.position(windowWidth - 150, 100);
  playButton.mouseClicked(play);
  randomButton = createButton('Randomize');
  randomButton.position(windowWidth - 150, 130);
  randomButton.mouseClicked(randomize);
  clearButton = createButton('Clear');
  clearButton.position(windowWidth - 150, 160);
  clearButton.mouseClicked(clearFunction);
}

function draw() {
  background(255)
  if (sliderY.value() > map.length) {
    for (r = map.length; r < sliderY.value(); r++) {
      map.push(new Array(sliderX.value()).fill(false))
    }
  } else if (sliderY.value() < map.length) {
    map = map.slice(0, sliderY.value())
  }
  if (sliderX.value() > map[0].length) {
    for (r = 0; r < map.length; r++) {
      for (c = map[0].length; c < sliderX.value(); c++) {
        map[r].push(false)
      }
    }
  } else if (sliderX.value() < map[0].length) {
    for (r = 0; r < sliderY.value(); r++) {
      map[r] = map[r].slice(0, sliderX.value())
    }
  }
  if (playBool) {
    next()
  }
  display()
}

function display() {
  for (r = 0; r < map.length; r++) {
    for (c = 0; c < map[0].length; c++) {
      if (map[r][c]) {
        fill(51);
        rect(c * 10, r * 10, 10, 10);
      } else {
        fill(255);
        rect(c * 10, r * 10, 10, 10);
      }
    }
  }
}

function next() {
  newMap = map.map(function (arr) {
    return arr.slice();
  });
  for (r = 0; r < map.length; r++) {
    for (c = 0; c < map[0].length; c++) {
      count = surroundings(r, c)
      if (!map[r][c]) {
        if (count == 3) {
          newMap[r][c] = true
        }
      } else {
        if (count <= 1) {
          newMap[r][c] = false
        } else if (count > 3) {
          newMap[r][c] = false
        }
      }
    }
  }
  map = newMap.map(function (arr) {
    return arr.slice();
  });
}

function surroundings(r, c) {
  count = 0
  for (y = Math.max(0, r - 1); y <= Math.min(r + 1, map.length - 1); y++) {
    for (x = Math.max(0, c - 1); x <= Math.min(c + 1, map[0].length - 1); x++) {
      if ((x != c || y != r) && map[y][x]) {
        count++
      }
    }
  }
  return count
}

function mouseDragged() {
  x = Math.floor(mouseX / 10)
  y = Math.floor(mouseY / 10)
  if (y < map.length && x < map[0].length) {
    map[y][x] = true
  }
}

function mouseClicked() {
  x = Math.floor(mouseX / 10)
  y = Math.floor(mouseY / 10)
  if (y < map.length && x < map[0].length) {
    map[y][x] = !map[y][x]
  }
}

function play() {
  if (playBool) {
    playBool = false
  } else {
    playBool = true
  }
}

function randomize() {
  for (r = 0; r < map.length; r++) {
    for (c = 0; c < map[0].length; c++) {
      map[r][c] = Math.random() >= 0.5
    }
  }
}

function clearFunction() {
  for (r = 0; r < map.length; r++) {
    for (c = 0; c < map[0].length; c++) {
      map[r][c] = false
    }
  }
}