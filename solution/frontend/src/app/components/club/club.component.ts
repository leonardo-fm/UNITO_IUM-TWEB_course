import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto gap-3 py-4' },
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit {
  clubId: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.clubId = params['id'];
    });
  }
}
