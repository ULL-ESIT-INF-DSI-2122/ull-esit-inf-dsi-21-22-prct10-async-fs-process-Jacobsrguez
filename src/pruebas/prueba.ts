import {writeFile} from 'fs';
import {watchFile} from 'fs';


writeFile('helloworld.txt', 'Hello World!', () => {
  console.log('File helloworld.txt has just been created');
});


watchFile('helloworld.txt', (curr, prev) => {
  console.log(`File size was ${prev.size} bytes before it was modified`);
  console.log(`Now file size is ${curr.size} bytes`);
});
