import { Subject } from 'rxjs';

var GLOBAL_NAME = '__$CCenter__';
var EVENT_COLLECTION_NAME = '__events__';
var STATE_COLLECTION_NAME = '__states__';
function checkCCenterStatus() {
    if (!window[GLOBAL_NAME]) {
        var errorMsg = 'CCenter没有初始化';
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
    return true;
}
function getEventByName(name) {
    return window[GLOBAL_NAME][EVENT_COLLECTION_NAME][name];
}
function getStateByName(name) {
    return window[GLOBAL_NAME][STATE_COLLECTION_NAME][name];
}
function init() {
    var _a;
    if (window[GLOBAL_NAME]) {
        console.warn('CCenter已经初始化，请不要重复初始化');
        return;
    }
    window[GLOBAL_NAME] = (_a = {},
        _a[EVENT_COLLECTION_NAME] = {},
        _a[STATE_COLLECTION_NAME] = {},
        _a);
}
function registerEvent(name) {
    checkCCenterStatus();
    if (getEventByName(name)) {
        console.error("\u4E8B\u4EF6\"" + name + "\"\u5DF2\u5B58\u5728\uFF0C\u4E0D\u80FD\u91CD\u590D\u6CE8\u518C\u3002");
        return;
    }
    var subject = new Subject();
    window[GLOBAL_NAME][EVENT_COLLECTION_NAME][name] = subject;
    return subject;
}
function registerState(name, value) {
    if (value === void 0) { value = null; }
    checkCCenterStatus();
    if (getStateByName(name)) {
        console.error("State\"" + name + "\"\u5DF2\u5B58\u5728\uFF0C\u4E0D\u80FD\u91CD\u590D\u6CE8\u518C\u3002");
        return;
    }
    var state = {
        value: value,
        observable: new Subject(),
    };
    window[GLOBAL_NAME][STATE_COLLECTION_NAME][name] = state;
    return state;
}
function subscribeEvent(name, next) {
    checkCCenterStatus();
    var event = getEventByName(name);
    if (!event) {
        var errorMsg = "Event: " + name + " \u4E0D\u5B58\u5728";
        console.error(errorMsg);
        return undefined;
    }
    var subscription = event.subscribe(next);
    return {
        unsubscribe: function () {
            subscription.unsubscribe();
        },
    };
}
function dispatchEvent(name, payload) {
    checkCCenterStatus();
    var event = getEventByName(name);
    if (!event) {
        var errorMsg = "Event: " + name + " \u4E0D\u5B58\u5728";
        console.error(errorMsg);
        return new Error(errorMsg);
    }
    event.next(payload);
}
function removeEvent(name) {
    checkCCenterStatus();
    var event = getEventByName(name);
    if (!event) {
        var errorMsg = "Event: " + name + " \u4E0D\u5B58\u5728";
        console.error(errorMsg);
        return new Error(errorMsg);
    }
    window[GLOBAL_NAME][EVENT_COLLECTION_NAME][name] = undefined;
}
function getState(name) {
    checkCCenterStatus();
    var state = getStateByName(name);
    if (!state) {
        var errorMsg = "State: " + name + " \u4E0D\u5B58\u5728";
        console.error(errorMsg);
        return undefined;
    }
    return state.value;
}
function subscribeState(name, next) {
    checkCCenterStatus();
    var state = getStateByName(name);
    if (!state) {
        var errorMsg = "State: " + name + " \u4E0D\u5B58\u5728";
        console.error(errorMsg);
        return null;
    }
    var subscription = state.observable.subscribe(next);
    return {
        unsubscribe: function () { return subscription.unsubscribe(); },
    };
}
function setState(name, value) {
    checkCCenterStatus();
    var state = getStateByName(name);
    if (!state) {
        var errorMsg = "State: " + name + " \u4E0D\u5B58\u5728";
        console.error(errorMsg);
        return new Error(errorMsg);
    }
    state.value = value;
    state.observable.next(value);
}

export { EVENT_COLLECTION_NAME, GLOBAL_NAME, STATE_COLLECTION_NAME, dispatchEvent, getEventByName, getState, getStateByName, init, registerEvent, registerState, removeEvent, setState, subscribeEvent, subscribeState };
//# sourceMappingURL=index.js.map
