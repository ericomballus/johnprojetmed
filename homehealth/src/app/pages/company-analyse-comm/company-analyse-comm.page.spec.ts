import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyAnalyseCommPage } from './company-analyse-comm.page';

describe('CompanyAnalyseCommPage', () => {
  let component: CompanyAnalyseCommPage;
  let fixture: ComponentFixture<CompanyAnalyseCommPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAnalyseCommPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyAnalyseCommPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
