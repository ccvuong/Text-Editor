import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ jate: content });
  const result = await request;
  console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (error) => {
  // connect to database we want
  const jateDb = await openDB('jate', 1);
  // database transaction and data rights
  const tx = jateDb.transaction('jate', 'readonly');
  // opens specified object store
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;

  // result?.value because result = object
  return result?.value;
}

initdb();
