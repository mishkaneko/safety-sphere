import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incidentIdToType',
})
export class IncidentIdToTypePipe implements PipeTransform {
  transform(incident_id: number): string {
    switch (incident_id) {
      case 1:
        return '肢體襲擊';
      case 2:
        return '言語威脅';
      case 3:
        return '非禮/性侵犯';
      case 4:
        return '可疑人物';
      case 5:
        return '高空墮物';
      case 6:
        return '野生動物襲擊';
      case 7:
        return '其他事件類型';
      default:
        return '';
    }
  }
}
