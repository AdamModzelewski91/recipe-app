import { Component, computed, input } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {
  isLoading = computed(() => this.loadingSpinnerService.isLoading());

  detectRouteTransitions = input(true);

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}
}
