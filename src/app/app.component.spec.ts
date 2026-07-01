import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { DarkModeService } from './services/darkmode.service';

describe('AppComponent', () => {
  let platformReadySpy: Promise<void>;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(async () => {
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Platform, useValue: platformSpy },
        DarkModeService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });
});
