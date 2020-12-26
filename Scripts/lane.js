let lanes = [];
let objectSpacing = 5;

class lane {
    constructor(offset) {
        this.offset = offset;
        this.gameObjects = [];
        lanes.push(this);
    }

    MoveForward() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            let obj = this.gameObjects[i];
            obj.objectSprite.y += difficulty;
        }
    }

    AddObject(type) {
        //create the object
        let obj = new gameObject(type, this.offset);

        //make sure the newly created object and the one under dont overlap
        if (this.gameObjects.length > 0) {
            if (this.gameObjects[0].objectSprite.y < obj.objectSprite.y + obj.objectSprite.height + objectSpacing) {
                obj.objectSprite.y = this.gameObjects[0].objectSprite.y - obj.objectSprite.height - objectSpacing;
            }
        }

        //place it at the top
        this.gameObjects.unshift(obj);
    }

    RemoveObjectFromTop() {
        let obj = this.gameObjects.pop();
        obj.Destroy();
    }

    Clear() {
        for (let obj of this.gameObjects) {
            obj.Destroy();
        }
    }

    CheckCollision() {
        if (this.gameObjects.length > 0) {
            let closestObject = this.gameObjects[this.gameObjects.length - 1];
            if (player.y - closestObject.objectSprite.y < closestObject.objectSprite.height) {
                this.RemoveObjectFromTop();
            }
        }
    }

    ClearGarbage() {
        if (this.gameObjects.length > 0) {
            if (this.gameObjects[this.gameObjects.length - 1].objectSprite.y > windowHeight) {
                this.RemoveObjectFromTop();
            }
        }
    }
}

        function ClearAllLanes() {
            for (let l of lanes) {
                l.Clear();
            }
        }
