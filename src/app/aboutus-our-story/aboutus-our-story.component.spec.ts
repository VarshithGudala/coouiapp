import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusOurStoryComponent } from './aboutus-our-story.component';

describe('AboutusOurStoryComponent', () => {
  let component: AboutusOurStoryComponent;
  let fixture: ComponentFixture<AboutusOurStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutusOurStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutusOurStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
