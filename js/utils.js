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


    return {
        screenWrap:screenWrap,
        resizePolygon:resizePolygon,
        constrainVelocity:constrainVelocity
    };
})();