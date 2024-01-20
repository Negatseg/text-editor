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
//export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  console.log('I am here updating the database!')
  const db = await openDB('jate',1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id:1,value:content});
  const result = await request;
  //await store.add(content);
  //await tx.done;
  console.log('Content added to the database:', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
//export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  const db = await openDB('jate',1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  //await tx.done;
  if (!result){
    console.log('database is empty')
  } else {
    console.log('All content from the database:', result.value);
  }
 
  return result.value;
};

initdb();


