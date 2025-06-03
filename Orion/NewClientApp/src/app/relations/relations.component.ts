import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RelationsStore } from './relations.store';
import { MatTableModule } from '@angular/material/table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule],
  providers: [RelationsStore],
  selector: 'app-relations',
  styleUrl: './relations.component.scss',
  templateUrl: './relations.component.html',
})
export class RelationsComponent {
  readonly store = inject(RelationsStore);
}
