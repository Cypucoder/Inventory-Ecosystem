import { Injectable } from '@angular/core';
import * as Toast from "nativescript-toast";
//import * as LocalNotifications from "nativescript-local-notifications";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor() { }
    
  /*getNotes() {
      LocalNotifications.getScheduledIds().then(
          function(ids) {
            console.log("ID's: " + ids);
            return ids;
          }
      )
  }*/
    
  /*notifyWithSound(note): void {
    LocalNotifications.schedule([{
      id: note._id,
      title: note.v_title,
      body: note.v_title + ' starts in 5 minutes',
      badge: 1,
      channel: 'Moon',
      groupedMessages: [note.v_info],
      groupSummary: 'Events happening soon: ',
      at: new Date(note.v_date) // 5 seconds from now "new Date().getTime() + (5 * 1000)"
    }]);
    console.log(new Date(note.v_date));
  }*/
  
  /*checkNotify() {
    // adding a handler, so we can do something with the received notification.. in this case an alert
      console.log("Check Notify");
      LocalNotifications.addOnMessageReceivedCallback(data => {
        alert({
            title: data.title,
            message: `id: '${data.id}', title: '${data.title}'.`,
            okButtonText: "Roger that"
          });
        }).then(
              function() {
                console.log("Listener added");
              }
        );
  }*/
  
  toast(a) {
      Toast.makeText(a).show();
  }
  
  toastLong(a) {
      Toast.makeText(a, "long").show();
  }
  
  alert(a) {
      alert(a);
  }

  /*eventRespond(title, message, id, callback) {
      console.log(title);
      console.log(message);
      console.log(id);
      dialogs.confirm({
        title: title,
        message: message,
        okButtonText: "Sign up",
        cancelButtonText: "Cancel",
        neutralButtonText: "Get Notified"
    }).then(result => {
        // result argument is boolean
        console.log("Dialog result: " + result);
        callback(result);
    });
  }*/

  /*cancelNote(id): void {
      LocalNotifications.cancel(id).then(
          function(foundAndCanceled) {
              if (foundAndCanceled) {
                console.log("Notification canceled!");
              } else {
                console.log("No note with id: " + id + " was found");
              }
          }
      )

  }

  cancelAll(): void {
    LocalNotifications.cancelAll();
  }
*/
}

/*Toast.makeText("ItemTapped: " + args.index, "long").show();
Toast.makeText("Notification set " + args._id, "long").show();
Toast.makeText("Sign up selected " + args._id).show();
*/
