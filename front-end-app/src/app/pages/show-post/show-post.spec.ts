import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPost } from './show-post';

describe('ShowPost', () => {
  let component: ShowPost;
  let fixture: ComponentFixture<ShowPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
