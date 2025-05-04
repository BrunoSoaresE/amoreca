import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { Evento } from '../../../../models/evento';
import { EventoStore } from '../../../../services/evento/evento.store';

@Component({
  standalone: true,
  selector: 'app-evento-nav',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-nav.component.html',
  styleUrls: ['./evento-nav.component.scss'],
})
export class EventoNavComponent extends EditBaseComponent implements OnInit {
  evento?: Evento;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventoStore: EventoStore,


  ) {
    super(injector);

  }
  ngOnInit(): void {
    this.eventoStore.evento$.subscribe(_evento => {
      this.evento = _evento;
    });
  }



  scrollToElement(id: string) {

    this.router.navigate([`${this.evento?.linkSite}`]).then(() => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);


    });


  }

  navegarPara(url: string) {
    // A navegação será feita de forma relativa à rota atual
    this.router.navigate([`${this.evento?.linkSite}/${url}`]);
  }

}
