
import type { ChatMessage, MessageAuthor } from '../types';

let db: IDBDatabase;

const DB_NAME = 'sophia-db';
const DB_VERSION = 1;
const CHAT_HISTORY_STORE = 'chatHistory';

export const initDB = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    if (db) {
      return resolve(true);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', request.error);
      reject(false);
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(true);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(CHAT_HISTORY_STORE)) {
        const store = dbInstance.createObjectStore(CHAT_HISTORY_STORE, { keyPath: 'id' });
        store.createIndex('contextId_index', 'contextId', { unique: false });
      }
    };
  });
};

export const addMessage = (contextId: string, message: { author: MessageAuthor, text: string }): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (!db) return reject('DB not initialized');
    const transaction = db.transaction([CHAT_HISTORY_STORE], 'readwrite');
    const store = transaction.objectStore(CHAT_HISTORY_STORE);
    
    const id = `${Date.now()}-${Math.random()}`;
    const messageToStore = { ...message, id, contextId };

    const request = store.add(messageToStore);

    request.onsuccess = () => {
      resolve(id);
    };

    request.onerror = () => {
      console.error('Error adding message:', request.error);
      reject(request.error);
    };
  });
};

export const getMessages = (contextId: string): Promise<ChatMessage[]> => {
    return new Promise<ChatMessage[]>((resolve, reject) => {
      if (!db) return reject('DB not initialized');
      const transaction = db.transaction([CHAT_HISTORY_STORE], 'readonly');
      const store = transaction.objectStore(CHAT_HISTORY_STORE);
      const index = store.index('contextId_index');
      const request = index.getAll(contextId);
  
      request.onsuccess = () => {
        const result = request.result as ChatMessage[];
        const sortedMessages = result.sort((a, b) => {
          const a_ts = parseInt(a.id.split('-')[0], 10);
          const b_ts = parseInt(b.id.split('-')[0], 10);
          return a_ts - b_ts;
        });
        resolve(sortedMessages);
      };
  
      request.onerror = () => {
        console.error('Error getting messages:', request.error);
        reject(request.error);
      };
    });
  };

export const clearMessages = (contextId: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!db) return reject('DB not initialized');
    const transaction = db.transaction([CHAT_HISTORY_STORE], 'readwrite');
    const store = transaction.objectStore(CHAT_HISTORY_STORE);
    const index = store.index('contextId_index');
    const keyRange = IDBKeyRange.only(contextId);
    const request = index.openCursor(keyRange);

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue | null>).result;
      if (cursor) {
        store.delete(cursor.primaryKey);
        cursor.continue();
      } else {
        resolve();
      }
    };

    request.onerror = () => {
      console.error('Error clearing messages:', request.error);
      reject(request.error);
    };
  });
};
