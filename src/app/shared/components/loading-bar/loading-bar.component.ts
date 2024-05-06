import { Component, computed } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarService } from '../../services/loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  isLoading = computed(() => this.loadingBarService.isLoading());
  constructor(private loadingBarService: LoadingBarService) {}
}
