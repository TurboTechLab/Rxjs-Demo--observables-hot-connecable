import { Observable, Subject, connectable } from 'rxjs';

const randomValue = () => Math.round(Math.random() * 10);

const coldByDefault = new Observable((observer) => {
  observer.next(randomValue());
  observer.complete();
});

const subject = new Subject();
const hotWithConnectable = connectable(coldByDefault, {
  connector: () => new Subject()
});
//Now all the subscriptions share the same data stream for each connect
hotWithConnectable.subscribe((v) => console.log(v));
hotWithConnectable.subscribe((v) => console.log(v));
hotWithConnectable.subscribe((v) => console.log(v));

hotWithConnectable.connect();
