import { Injectable } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio'

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  constructor() {}

  _isAlarming: boolean = false
  get isAlarming () {
    return this._isAlarming
  }
  set isAlarming (value) {
    this._isAlarming=  value
  }

  preload () {
    NativeAudio.preload({
      assetId: "alarm",
      assetPath: "police_siren.mp3",
      audioChannelNum: 1,
      isUrl: false
    });
  }

  play () {
    NativeAudio.play({
      assetId: 'alarm',
    });
  }

  loop () {
    NativeAudio.loop({
      assetId: 'alarm',
    });
    this.isAlarming = true
  }

  stop () {
    NativeAudio.stop({
      assetId: 'alarm',
    });
    this.isAlarming = false
  }

  unload () {
    NativeAudio.unload({
      assetId: 'alarm',
    });
  }

  setVolume () {
    NativeAudio.setVolume({
      assetId: 'alarm',
      volume: 1.0,
    });
  }

  init () {
    this.preload()
    this.setVolume()
  }

  destroy () {
    this.unload()
  }
}
