import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterKeysComponent } from './filterkeys.component';

describe('TestsqliteComponent', () => {
  let component: FilterKeysComponent;
  let fixture: ComponentFixture<FilterKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterKeysComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
