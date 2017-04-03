function sprite (options) {
    var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1

  that.width = options.width
  that.height = options.height
  that.image = options.image
  that.scale = options.scale || 0.3
  that.sX = options.sX || 0
  that.ignoreEndFrames = 0

  that.update = function () {

          tickCount += 1

          if (tickCount > ticksPerFrame) {

      tickCount = 0

              // If the current frame index is in range
              if (frameIndex < numberOfFrames - (1+that.ignoreEndFrames)) {
                  // Go to the next frame
                  frameIndex += 1
              } else {
                  frameIndex = 0
              }
          }
      }

  that.render = function (x,y) {
      // Draw the animation
      ctx.drawImage(
      that.image,
      frameIndex * (that.width / numberOfFrames),
      that.sX,
      that.width / numberOfFrames,
      that.height,
      x,
      y,
      (that.width * that.scale) / numberOfFrames,
      that.height*that.scale)
  }

  that.setScale = function(s){
    that.scale = s
  }
  that.setsX = function(sX){
    that.sX = sX
  }
  that.setIgnoreEndFrames = function(x){
    that.ignoreEndFrames = x
  }
  return that;
}
