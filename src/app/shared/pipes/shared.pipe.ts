import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 200, fullText: boolean = false): string {
    if (!value) return '';
    return fullText || value.length <= limit ? value : value.substring(0, limit) + '...';
  }
}
