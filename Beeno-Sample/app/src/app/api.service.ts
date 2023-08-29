import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { setBaseUrl } from 'nest-client';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiOrigin = 'http://localhost:3000';

  constructor(private toastCtrl: ToastController) {
    setBaseUrl(this.apiOrigin);
  }

  async showError(error: unknown) {
    let toast = await this.toastCtrl.create({
      message: String(error).replace('TypeError: ', ''),
      color: 'danger',
      duration: 3500,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler() {
            toast.dismiss();
          },
        },
      ],
    });
    await toast.present();
  }

  async get(url: string) {
    return this.handleRes(fetch(this.apiOrigin + url));
  }

  async post(url: string, body: object) {
    return this.handleRes(
      fetch(this.apiOrigin + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    );
  }

  async handleRes(p: Promise<Response>) {
    let res: Response;
    try {
      res = await p;
    } catch (error) {
      await this.showError('Please check your internet connection');
      throw error;
    }
    try {
      let json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      return json;
    } catch (error) {
      await this.showError(error);
      throw error;
    }
  }
}
