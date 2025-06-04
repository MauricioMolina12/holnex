import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining',
  standalone: true
})
export class TimeRemainingPipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / 3600) % 24;
    const days = Math.floor(seconds / 86400) % 7;
    const weeks = Math.floor(seconds / 604800);

    const parts = [];

    if (weeks > 0) parts.push(`${weeks}w`);
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds % 60 !== 0 && weeks === 0) parts.push(`${seconds % 60}s`);

    return parts.join(' ');
  }
}
