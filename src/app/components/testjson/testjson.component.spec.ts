import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestjsonComponent } from './testjson.component';

describe('TestjsonComponent', () => {
  let component: TestjsonComponent;
  let fixture: ComponentFixture<TestjsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestjsonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestjsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
