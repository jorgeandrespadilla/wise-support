const storageEvent = {
    get: "getStorage",
    update: "updateStorage",
};

type StorageType = "sessionStorage" | "localStorage";

const storageMap: Record<StorageType, Storage> = {
    sessionStorage,
    localStorage,
};

/**
 * Utilities to work with the browser's session storage and synchronize it across tabs.
 */
export const storageHandler = (type: StorageType) => {
    const storage = storageMap[type];
    return {
        get: (key: string) => storage.getItem(key),
        set: (key: string, value: string) => {
            storage.setItem(key, value);
            sendStorageUpdate();
        },
        remove: (key: string) => {
            storage.removeItem(key);
            sendStorageUpdate();
        },
        isEmpty: () => storage.length === 0,
        length: storage.length,
    };
}

/**
 * Creates a storage handler for the given key.
 */
export const itemStorage = <T = string>(key: string, type: StorageType = "sessionStorage") => {
    const storage = storageHandler(type);
    return {
        get: () => storage.get(key) as T | null,
        set: (value: string) => storage.set(key, value),
        remove: () => storage.remove(key),
    };
}

/**
 * Triggers an event based on changes to the storage using the given key.
 * @param eventKey The key to use for the event.
 * @param data The data to pass to the event.
 */
export function triggerStorageEvent(eventKey: string, data: string) {
    localStorage.setItem(eventKey, data);
    localStorage.removeItem(eventKey);
}

/**
 * Listens for changes to the local storage.
 * @param callback The callback to be called when the local storage changes.
 */
export function addStorageListener(callback: (event: StorageEvent) => void) {
    window.addEventListener('storage', callback);
}

/**
 * Removes the listener for changes to the local storage.
 * @param callback The callback used to listen for changes.
 */
export function removeStorageListener(callback: (event: StorageEvent) => void) {
    window.removeEventListener('storage', callback);
}

/**
 * Sends an event to the other tabs to force them to update their storage.
 */
export const sendStorageUpdate = () => {
    triggerStorageEvent(storageEvent.update, JSON.stringify(sessionStorage));
}

/**
 * Asks other tabs for session storage updates.
 */
export const getStorageUpdate = () => {
    triggerStorageEvent(storageEvent.get, String(Date.now()));
}

/**
 * Listens for changes to the local storage and updates the session storage.
 * @returns A function to remove the listener.
 */
export const listenForStorageUpdates = (onUpdateCompleted = () => { }) => {
    const callback = (event: StorageEvent) => {
        if (event.key === storageEvent.get) {
            // Some tab asked for the sessionStorage -> send it
            sendStorageUpdate();
        }
        if (event.key === storageEvent.update) {
            // sessionStorage should be updated -> update it
            const data = JSON.parse(event.newValue || '{}');
            for (const key in data) {
                sessionStorage.setItem(key, data[key]);
            }
            onUpdateCompleted();
        }
    }
    addStorageListener(callback);
    return () => removeStorageListener(callback);
}
