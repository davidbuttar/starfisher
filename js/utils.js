var utils = (function(){

    function screenWrap(sprite) {
        if (sprite.x < 0) {

            sprite.x = game.width;
        }
        else if (sprite.x > game.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = game.height;
        }
        else if (sprite.y > game.height) {
            sprite.y = 0;
        }
    }

    function constrainVelocity(sprite, maxVelocity) {
        var body = sprite.body;
        var angle, currVelocitySqr, vx, vy;

        vx = body.data.velocity[0];
        vy = body.data.velocity[1];

        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);

            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;

            body.data.velocity[0] = vx;
            body.data.velocity[1] = vy;
        }

    }

    /**
     * Accelerate to object.
     *
     * @param obj1
     * @param obj2
     * @param speed
     */
    function accelerateToObject(obj1, obj2, speed) {
        if (typeof speed === 'undefined') { speed = 60; }
        var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
        obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
        obj1.body.force.y = Math.sin(angle) * speed;
    }


    /**
     * Allow us to access the physics polygon definitions from the sprites.json file and scale them
     * to a new key.
     *
     * @param originalPhysicsKey
     * @param newPhysicsKey
     * @param shapeKey
     * @param scale
     */
    function resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale) {
        var newData = [];
        game.cache._cache.physics[originalPhysicsKey].data[shapeKey].forEach(function (shapes) {
            var shapeArray = [];
            shapes.shape.forEach(function (values) {
                shapeArray.push(values * scale);
            });
            newData.push({shape: shapeArray});

        });
        var item = {};
        item[shapeKey] = newData;
        game.load.physics(newPhysicsKey, '', item);
    }

    function centerGameObjects (objects) {
        objects.forEach(function (object) {
        object.anchor.setTo(0.5);
        })
    }

    function addMenuOption (text, callback, className) {

    // use the className argument, or fallback to menuConfig, but
    // if menuConfig isn't set, just use "default"
    className || (className = this.menuConfig.className || 'default');

    // set the x coordinate to game.world.center if we use "center"
    // otherwise set it to menuConfig.startX
    var x = this.menuConfig.startX === "center" ?
      game.world.centerX :
      this.menuConfig.startX;

    // set Y coordinate based on menuconfig
    var y = this.menuConfig.startY;

    // create
    var txt = game.add.text(
      x,
      (this.optionCount * 80) + y,
      text,
      style.navitem[className]
    );

    // use the anchor method to center if startX set to center.
    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);

    txt.inputEnabled = true;

    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(function (target) {
      target.setStyle(style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
      target.setStyle(style.navitem[className]);
    });

    this.optionCount ++;

    return txt;
  }


    return {
        screenWrap:screenWrap,
        resizePolygon:resizePolygon,
        constrainVelocity:constrainVelocity,
        accelerateToObject: accelerateToObject,
        centerGameObjects: centerGameObjects,
        addMenuOption: addMenuOption
    };
})();