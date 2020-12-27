let queue = [];
let length;

//FIFI: first in, first out

function getHead() {
    return queue[0];
}

function deleteHead() {
    //#TODO
}

function getTail() {
    return queue[queue.length - 1];
}

function addQueue(x) {
    let element = new gameObject('collectible', x);
    queue.push(element);
}

function moveQueueForward() {
    for (let i of queue) {
        i.objectSprite.y += difficulty;
    }
}
