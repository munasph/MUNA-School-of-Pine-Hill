export interface StaffMember {
  id:              number;
  email:           string;
  displayName:     string;
  role:            'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
  approvalStatus:  'PENDING' | 'APPROVED' | 'REJECTED';
  active:          boolean;
  createdAt?:      string;
  approvedAt?:     string;
}

export interface StaffInvitePayload {
  email:       string;
  displayName: string;
  role:        'ADMIN' | 'EDITOR';
}
