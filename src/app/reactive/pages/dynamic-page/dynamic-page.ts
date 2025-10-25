
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe],
  templateUrl: './dynamic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPage { }
