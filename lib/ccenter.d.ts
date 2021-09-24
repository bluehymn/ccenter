import { Subject } from 'rxjs';
export declare const GLOBAL_NAME = "__$CCenter__";
export declare const EVENT_COLLECTION_NAME = "__events__";
export declare const STATE_COLLECTION_NAME = "__states__";
export interface State {
    value: any;
    observable: Subject<any>;
}
export declare function getEventByName(name: string): Subject<any> | undefined;
export declare function getStateByName(name: string): State | undefined;
export declare function init(): void;
export declare function registerEvent(name: string): Subject<unknown> | undefined;
export declare function registerState(name: string, value?: any): State | undefined;
export declare function subscribeEvent(name: string, next: (value: any) => void): {
    unsubscribe: () => void;
} | undefined;
export declare function dispatchEvent(name: string, payload: any): Error | undefined;
export declare function removeEvent(name: string): Error | undefined;
export declare function getState(name: string): any;
export declare function subscribeState(name: string, next: (value: any) => void): {
    unsubscribe: () => void;
} | null;
export declare function setState(name: string, value: any): Error | undefined;
