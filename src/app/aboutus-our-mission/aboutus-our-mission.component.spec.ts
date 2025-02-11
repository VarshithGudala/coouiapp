import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusOurMissionComponent } from './aboutus-our-mission.component';

describe('AboutusOurMissionComponent', () => {
  let component: AboutusOurMissionComponent;
  let fixture: ComponentFixture<AboutusOurMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutusOurMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutusOurMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
