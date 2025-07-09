import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarCampanhaPage } from './criar-campanha.page';

describe('CriarCampanhaPage', () => {
  let component: CriarCampanhaPage;
  let fixture: ComponentFixture<CriarCampanhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCampanhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
