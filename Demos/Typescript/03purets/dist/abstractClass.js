"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TakePhoto {
    cameraMode;
    filter;
    constructor(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    getReelTime() {
        return 8;
    }
}
class Instagram extends TakePhoto {
    cameraMode;
    filter;
    burst;
    constructor(cameraMode, filter, burst) {
        super(cameraMode, filter);
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }
    getSepia() {
        console.log("Sepia");
    }
}
// const mr1 = new TakePhoto("test","test")
const mr2 = new Instagram("test", "test", 6);
mr2.getReelTime();
//# sourceMappingURL=abstractClass.js.map