import { Component } from '@angular/core';
import {timer, interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer-angular';

  rxInterval = interval(1000);
  rxIntervalSubcription: any;

  time =  new Date(0);
  goTime = false;
  clicked = false;

  timeFixer = (str: number) => {
    return str.toString().length < 2 ? "0" + str : str;
  }

  stopTimer = () =>{
    this.rxIntervalSubcription.unsubscribe();
    this.goTime = false;
  }
  
  startTimer = () =>{
    this.rxIntervalSubcription = this.rxInterval.subscribe((n) =>
      this.time = new Date(this.time.setUTCSeconds(this.time.getUTCSeconds() + 1))
    );
    this.goTime = true;
  }

  handleTimerStart = () => {
    if (!this.goTime) {
      this.startTimer();
    } else {
      this.stopTimer();
      this.time.setUTCSeconds(0);
    }
  };


  handleWait = () => {
    if (this.clicked) {
      this.stopTimer();
    } else {
      this.clicked = true;
      timer(500).subscribe((time) => this.clicked = true);
    }
  }

  handleReset = () => {
      this.stopTimer();
      this.time.setUTCSeconds(0);
      this.startTimer();
  }
}
