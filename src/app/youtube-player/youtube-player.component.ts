import { Component, Input, Output, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('player') playerElement: ElementRef;
  @Input() videoId: string;
  @Output() onPlayerTimeChange = new EventEmitter<number>();

  player: any;
  videoIsPlaying: false;
  duration: number;
  timer: number;

  currentPlayerTime = 0;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '390px',
        width: '600px',
        videoId: this.videoId,
        playerVars: {'autoplay': 0, 'rel': 0, 'controls': 2},
        events: {
          'onReady': (event) => {
            this.duration = this.player.getDuration();
            console.log('ON READY', event);
          },
          'onStateChange': () => {
            const state = this.player.getPlayerState();
            console.log('ON STATE CHANGE!', this.player.getPlayerState());

            switch (state) {
              case 0:
                this.syncTime();
                this.stopTimer();
                break;
              case 1:
                this.syncTime();
                this.startTimer();
                break;
              case 2:
                this.syncTime();
                this.stopTimer();
                break;
              case 3:
                this.syncTime();
                this.stopTimer();
                break;
              default:
                // do nothing for now
            }
          }
        }
      });
    };
  }

  ngAfterViewInit() {
    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    this.playerElement.nativeElement.appendChild(playerApiScript);
  }

  playVideo() {
    this.player.playVideo();
  }

  stopVideo() {
    this.player.stopVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  startTimer() {
    this.timer = window.setInterval(() => {
      this.currentPlayerTime++;
      this.onPlayerTimeChange.emit(this.currentPlayerTime);
      this.ref.detectChanges();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  syncTime() {
    const oldPlayerTime = this.currentPlayerTime;
    this.currentPlayerTime = Math.floor(this.player.getCurrentTime());
    if (this.currentPlayerTime !== oldPlayerTime) {
      this.onPlayerTimeChange.emit(this.currentPlayerTime);
      this.ref.detectChanges();
    }
  }

}
