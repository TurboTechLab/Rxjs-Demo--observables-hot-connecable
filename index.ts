import { Observable, Subject, connectable } from 'rxjs';

const randomValue = () => Math.round(Math.random() * 10);

const coldByDefault = new Observable((observer) => {
  observer.next(randomValue());
  observer.complete();
});

const hotWithConnectable = connectable(
    coldByDefault, 
    { connector: () => new Subject()}
);

//Now all the subscriptions will share the same data stream 
hotWithConnectable.subscribe((v) => console.log(v)),
hotWithConnectable.subscribe((v) => console.log(v)), 
hotWithConnectable.subscribe((v) => console.log(v));
//connect will start streaming the data
hotWithConnectable.connect();
