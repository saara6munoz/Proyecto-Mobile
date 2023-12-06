import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestcontPage } from './restcont.page';

describe('RestcontPage', () => {
  let component: RestcontPage;
  let fixture: ComponentFixture<RestcontPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestcontPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
