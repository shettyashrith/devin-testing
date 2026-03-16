import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App, Participant } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have exactly 10 participants', () => {
    expect(component.participants.length).toBe(10);
  });

  it('should have participants with all required fields', () => {
    component.participants.forEach((participant) => {
      expect(participant.id).toBeDefined();
      expect(participant.name).toBeTruthy();
      expect(participant.assetGeneration).toBeTruthy();
      expect(participant.status).toBeTruthy();
    });
  });

  it('should only contain valid statuses', () => {
    const validStatuses: Participant['status'][] = [
      'Yet-to-start',
      'In-progress',
      'Done',
      'Failed',
    ];
    component.participants.forEach((participant) => {
      expect(validStatuses).toContain(participant.status);
    });
  });

  it('should contain all four status types in the data', () => {
    const statuses = new Set(component.participants.map((p) => p.status));
    expect(statuses.has('Yet-to-start')).toBe(true);
    expect(statuses.has('In-progress')).toBe(true);
    expect(statuses.has('Done')).toBe(true);
    expect(statuses.has('Failed')).toBe(true);
  });

  describe('getStatusClass', () => {
    it('should return "status-yet-to-start" for Yet-to-start', () => {
      expect(component.getStatusClass('Yet-to-start')).toBe(
        'status-yet-to-start',
      );
    });

    it('should return "status-in-progress" for In-progress', () => {
      expect(component.getStatusClass('In-progress')).toBe(
        'status-in-progress',
      );
    });

    it('should return "status-done" for Done', () => {
      expect(component.getStatusClass('Done')).toBe('status-done');
    });

    it('should return "status-failed" for Failed', () => {
      expect(component.getStatusClass('Failed')).toBe('status-failed');
    });

    it('should return empty string for unknown status', () => {
      expect(component.getStatusClass('Unknown')).toBe('');
    });
  });

  describe('DOM rendering', () => {
    it('should render the page title', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1.nativeElement.textContent).toBe(
        'Participant Asset Generation Status',
      );
    });

    it('should render 4 table header columns', () => {
      const headers = fixture.debugElement.queryAll(
        By.css('.status-table thead th'),
      );
      expect(headers.length).toBe(4);
      expect(headers[0].nativeElement.textContent).toBe('#');
      expect(headers[1].nativeElement.textContent).toBe('Participant Name');
      expect(headers[2].nativeElement.textContent).toBe('Asset Generation');
      expect(headers[3].nativeElement.textContent).toBe('Status');
    });

    it('should render 10 table body rows', () => {
      const rows = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      );
      expect(rows.length).toBe(10);
    });

    it('should display correct data in the first row', () => {
      const firstRow = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      )[0];
      const cells = firstRow.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent.trim()).toBe('1');
      expect(cells[1].nativeElement.textContent.trim()).toBe('Alice Johnson');
      expect(cells[2].nativeElement.textContent.trim()).toBe('Logo Design');
    });

    it('should apply correct CSS class to Done rows', () => {
      const rows = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      );
      // Row 0 (Alice Johnson) has status Done
      expect(rows[0].nativeElement.classList.contains('status-done')).toBe(
        true,
      );
    });

    it('should apply correct CSS class to In-progress rows', () => {
      const rows = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      );
      // Row 1 (Bob Smith) has status In-progress
      expect(
        rows[1].nativeElement.classList.contains('status-in-progress'),
      ).toBe(true);
    });

    it('should apply correct CSS class to Yet-to-start rows', () => {
      const rows = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      );
      // Row 2 (Charlie Brown) has status Yet-to-start
      expect(
        rows[2].nativeElement.classList.contains('status-yet-to-start'),
      ).toBe(true);
    });

    it('should apply correct CSS class to Failed rows', () => {
      const rows = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      );
      // Row 3 (Diana Prince) has status Failed
      expect(rows[3].nativeElement.classList.contains('status-failed')).toBe(
        true,
      );
    });

    it('should render status badges with correct CSS classes', () => {
      const badges = fixture.debugElement.queryAll(By.css('.status-badge'));
      expect(badges.length).toBe(10);

      // First badge (Done)
      expect(badges[0].nativeElement.classList.contains('status-done')).toBe(
        true,
      );
      expect(badges[0].nativeElement.textContent.trim()).toBe('Done');

      // Second badge (In-progress)
      expect(
        badges[1].nativeElement.classList.contains('status-in-progress'),
      ).toBe(true);
      expect(badges[1].nativeElement.textContent.trim()).toBe('In-progress');

      // Third badge (Yet-to-start)
      expect(
        badges[2].nativeElement.classList.contains('status-yet-to-start'),
      ).toBe(true);
      expect(badges[2].nativeElement.textContent.trim()).toBe('Yet-to-start');

      // Fourth badge (Failed)
      expect(badges[3].nativeElement.classList.contains('status-failed')).toBe(
        true,
      );
      expect(badges[3].nativeElement.textContent.trim()).toBe('Failed');
    });

    it('should display sequential row numbers starting from 1', () => {
      const rows = fixture.debugElement.queryAll(
        By.css('.status-table tbody tr'),
      );
      rows.forEach((row, index) => {
        const firstCell = row.queryAll(By.css('td'))[0];
        expect(firstCell.nativeElement.textContent.trim()).toBe(
          String(index + 1),
        );
      });
    });
  });
});
