import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('player') playerElement: ElementRef;
  player: any;

  constructor() { }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      console.log('TESSSTT');
      this.player = new (<any>window).YT.Player('player', {
        height: '390px',
        width: '600px',
        videoId: 'M7lc1UVf-VE',
        playerVars: {'autoplay': 1, 'rel': 0, 'controls': 2},
        events: {
          'onReady': () => {
            console.log('TEST');
          },
          'onStateChange': () => {
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

}
