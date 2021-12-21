import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhamarcieRecherchePage } from './phamarcie-recherche.page';

describe('PhamarcieRecherchePage', () => {
  let component: PhamarcieRecherchePage;
  let fixture: ComponentFixture<PhamarcieRecherchePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhamarcieRecherchePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhamarcieRecherchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
