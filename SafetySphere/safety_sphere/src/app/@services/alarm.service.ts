import { Injectable } from '@angular/core';
// import { NativeAudio } from '@capacitor-community/native-audio'

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
      assetPath= "/assets/sounds/police_siren.mp3"

      audio?:HTMLAudioElement

  constructor() {
    this.init()
  }

  _isAlarming: boolean = false
  get isAlarming () {
    return this._isAlarming
  }
  set isAlarming (value) {
    this._isAlarming=  value
  }

  async preload () {
    let res= await fetch(this.assetPath)
    await res.arrayBuffer()
    // NativeAudio.preload({
    //   assetId: "alarm",
    //   assetPath: "/assets/sounds/police_siren.mp3",
    //   audioChannelNum: 1,
    //   isUrl: false
    // });
  }

  // play () {
  //   NativeAudio.play({
  //     assetId: 'alarm',
  //   });
  // }

  loop () {
    this.stop()
    this.audio = document.createElement('audio')
    document.body.appendChild(this.audio)
    this.audio.src = this.assetPath
    this.audio.loop = true 
    this.audio.volume = 1
    this.audio.play()
    // NativeAudio.loop({
    //   assetId: 'alarm',
    // });
    this.isAlarming = true
  }

  stop () {
    if(this.audio){
      this.audio.pause()
      this.audio.remove()
      delete this.audio
    }
    // NativeAudio.stop({
    //   assetId: 'alarm',
    // });
    this.isAlarming = false
  }

  // unload () {
  //   NativeAudio.unload({
  //     assetId: 'alarm',
  //   });
  // }

  setVolume () {
    // NativeAudio.setVolume({
    //   assetId: 'alarm',
    //   volume: 1.0,
    // });
    // TODO set volume
  }

  // async isPlaying () {
  //   const { isPlaying } = await NativeAudio.isPlaying({ assetId: 'fire' })
  //   return isPlaying
  // }

 private async init () {
    await this.preload()
    this.setVolume()
  }

  destroy () {
    this.stop()
    // this.unload()
  }
}
