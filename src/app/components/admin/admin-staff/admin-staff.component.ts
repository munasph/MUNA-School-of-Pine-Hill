import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import type { StaffInvitePayload, StaffMember } from '../../../models/staff.model';
import { AuthService } from '../../../services/auth.service';
import { StaffService } from '../../../services/staff.service';
import { EMAIL_PATTERN, fieldError } from '../../../utils/form-validation';

type StaffTab = 'active' | 'pending' | 'invite';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.css'],
})
export class AdminStaffComponent implements OnInit, OnDestroy {
  activeTab: StaffTab = 'active';
  activeStaff: StaffMember[] = [];
  pendingStaff: StaffMember[] = [];
  loading = true;
  actionError: string | null = null;
  inviteSuccess: string | null = null;
  inviteForm!: FormGroup;
  inviting = false;

  readonly roleOptions = [
    { value: 'EDITOR', label: 'Editor' },
    { value: 'ADMIN', label: 'Admin' },
  ];

  private subs = new Subscription();

  constructor(
    public readonly auth: AuthService,
    private readonly staffService: StaffService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.inviteForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email:       ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      role:        ['EDITOR', [Validators.required]],
    });
    this.loadStaff();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setTab(tab: StaffTab): void {
    this.activeTab = tab;
    this.actionError = null;
    this.inviteSuccess = null;
  }

  loadStaff(): void {
    this.loading = true;
    this.subs.add(
      this.staffService.listActive().subscribe({
        next: (staff: StaffMember[]) => {
          this.activeStaff = staff;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      }),
    );
    this.subs.add(
      this.staffService.listPending().subscribe({
        next: (staff: StaffMember[]) => { this.pendingStaff = staff; },
      }),
    );
  }

  approve(member: StaffMember): void {
    this.actionError = null;
    this.subs.add(
      this.staffService.approve(member.id).subscribe({
        next: () => this.loadStaff(),
        error: (err: HttpErrorResponse) => { this.actionError = err.error?.message ?? 'Could not approve staff member.'; },
      }),
    );
  }

  reject(member: StaffMember): void {
    this.actionError = null;
    this.subs.add(
      this.staffService.reject(member.id).subscribe({
        next: () => this.loadStaff(),
        error: (err: HttpErrorResponse) => { this.actionError = err.error?.message ?? 'Could not reject staff member.'; },
      }),
    );
  }

  inviteErrorFor(field: 'displayName' | 'email' | 'role'): string | null {
    const labels = { displayName: 'Name', email: 'Email', role: 'Role' };
    return fieldError(this.inviteForm.get(field), labels[field]);
  }

  submitInvite(): void {
    if (this.inviteForm.invalid) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    this.inviting = true;
    this.actionError = null;
    this.inviteSuccess = null;
    const payload = this.inviteForm.value as StaffInvitePayload;

    this.subs.add(
      this.staffService.invite(payload).subscribe({
        next: () => {
          this.inviting = false;
          this.inviteSuccess = `Invite sent to ${payload.email}.`;
          this.inviteForm.reset({ role: 'EDITOR' });
          this.loadStaff();
        },
        error: (err: HttpErrorResponse) => {
          this.inviting = false;
          this.actionError = err.error?.message ?? 'Could not send invite.';
        },
      }),
    );
  }
}
