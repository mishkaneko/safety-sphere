import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from '../../@services/api.service'
// import { Preferences } from '@capacitor/preferences';
import { AppStatusService } from 'src/app/@services/app-status.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  userEmailTypeIn: string = ''

  userData: any = []

  userUuid = this.appStatusService.userUuid

  constructor (
    private notification: NzNotificationService,
    private apiService: ApiService,
    private appStatusService: AppStatusService,
    private modal: NzModalService
  ) {}

  async ngOnInit() {
    this.retrieveAllFollow()
  }

  async retrieveAllFollow () {
    // const userUuid = await Preferences.get({ key: 'user_uuid' });
    // this.apiService.post({ currentUserUuid: userUuid.value }, '/follow/retrieve-all').subscribe({
      this.apiService.post({ currentUserUuid: this.userUuid }, '/follow/retrieve-all').subscribe({
    
      next: (response: any) => {
        // { emerg_contact_email: string, emerg_contact_uuid: string }
        this.userData = response[0].emerg_contacts
      },
      error: error => {
        console.error(error)
      }
    })
  }

  async createFollow () {
    if (!this.userEmailTypeIn) return
    const isInputValid = () => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(this.userEmailTypeIn)
    if (!isInputValid()) return this.createNotification({ type: 'warning', title: 'Email格式錯誤！', message: '請輸入正確的email。' })
    // const userUuid = await Preferences.get({ key: 'user_uuid' });
    const data = {
      email: this.userEmailTypeIn,
      // userUuid: userUuid.value
      userUuid: this.userUuid
    }
    this.apiService.post(data, '/follow/create').subscribe({
      next: (response: any) => {
        const { succeedToCreate, emergContact } = response
        if (succeedToCreate) {
          this.userData.push({ emerg_contact_email: this.userEmailTypeIn, emerg_contact_uuid: emergContact[0].user_uuid })
          this.createNotification({ type: 'success', title: '新增成功！', message: `已新增${this.userEmailTypeIn}` })
        } else {
          this.createNotification({ type: 'error', title: '新增失敗！', message: '帳戶不存在！' })
        }
        this.userEmailTypeIn = ''
      },
      error: error => {
        console.error(error)
      }
    })
    return undefined
  }

  showDeleteConfirm(followEmail: string, followUuid: string) {
    this.modal.confirm({
      nzTitle: '注意！',
      nzContent: `<b style="color: red;">是否確認刪除 "${followEmail}" </b>`,
      nzOkText: '是',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteFollow(followUuid),
      nzCancelText: '否'
    });
  }

  deleteFollow (followUuid: string) {
    const data = { currentUserUuid: this.userUuid, followUuid }
    this.apiService.post(data, '/follow/delete').subscribe({
      next: () => {
        const elementIndex = this.userData.findIndex((elem:any) => elem.emerg_contact_uuid === followUuid)
        this.userData.splice(elementIndex, 1)
        this.createNotification({ type: 'success', title: '刪除成功！', message: `已成功刪除${this.userEmailTypeIn}` })
      },
      error: error => console.error(error)
    })
  }

  createNotification(props: { type: string, title: string, message: string }) {
    const { type, title, message } = props
    this.notification.create(type, title, message);
  }
}
