export type CmsPublishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface CmsAdminModuleConfig {
  key:           string;
  label:         string;
  description:   string;
  route:         string;
  apiPath:       string;
  scaffoldOnly?: boolean;
  titleField?:   string;
  statusField?:  string;
}

export const CMS_PUBLISH_STATUSES: CmsPublishStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export const CMS_PUBLISH_LABELS: Record<CmsPublishStatus, string> = {
  DRAFT:     'Draft',
  PUBLISHED: 'Published',
  ARCHIVED:  'Archived',
};

/** Scaffold modules — CRUD via generic admin UI; remove unused entries anytime. */
export const CMS_ADMIN_MODULES: CmsAdminModuleConfig[] = [
  { key: 'events',            label: 'Events',            description: 'Calendar events',              route: 'events',            apiPath: '/api/admin/events',            titleField: 'title',  statusField: 'status' },
  { key: 'news',              label: 'News',              description: 'News and blog posts',          route: 'news',              apiPath: '/api/admin/news',              titleField: 'title',  statusField: 'status' },
  { key: 'faculty',           label: 'Faculty',           description: 'Staff directory',              route: 'faculty',           apiPath: '/api/admin/faculty',           titleField: 'name',   statusField: 'status' },
  { key: 'documents',         label: 'Documents',         description: 'Downloadable files',           route: 'documents',         apiPath: '/api/admin/documents',         titleField: 'title',  statusField: 'status' },
  { key: 'gallery',           label: 'Gallery',           description: 'Photo gallery items',          route: 'gallery',           apiPath: '/api/admin/gallery',           titleField: 'title',  statusField: 'status' },
  { key: 'faqs',              label: 'FAQs',              description: 'Frequently asked questions',   route: 'faqs',              apiPath: '/api/admin/faqs',              titleField: 'question', statusField: 'status' },
  { key: 'media',             label: 'Media library',     description: 'Uploaded file references',     route: 'media',             apiPath: '/api/admin/media',             titleField: 'fileName' },
  { key: 'seo',               label: 'Page SEO',          description: 'Per-page metadata',            route: 'seo',               apiPath: '/api/admin/seo',               titleField: 'pageKey' },
  { key: 'users',             label: 'Admin users',       description: 'Admin accounts (scaffold auth)', route: 'users',             apiPath: '/api/admin/users',             titleField: 'email',  scaffoldOnly: true },
  { key: 'intake-limits',     label: 'Intake limits',     description: 'Grade capacity per year',      route: 'intake-limits',     apiPath: '/api/admin/intake-limits',     titleField: 'gradeKey' },
  { key: 'form-fields',       label: 'Form fields',       description: 'Admission form configuration', route: 'form-fields',       apiPath: '/api/admin/form-fields',       titleField: 'label' },
  { key: 'inquiry-templates', label: 'Reply templates',   description: 'Canned contact replies',       route: 'inquiry-templates', apiPath: '/api/admin/inquiry-templates', titleField: 'name' },
  { key: 'email-campaigns',   label: 'Email campaigns',   description: 'Newsletter drafts',            route: 'email-campaigns',   apiPath: '/api/admin/email-campaigns',   titleField: 'subject', statusField: 'status' },
  { key: 'notifications',     label: 'Notifications',     description: 'Email alert toggles',          route: 'notifications',     apiPath: '/api/admin/notifications',     scaffoldOnly: true },
  { key: 'analytics',         label: 'Analytics',         description: 'Google Analytics ID',          route: 'analytics',         apiPath: '/api/admin/analytics',         scaffoldOnly: true },
  { key: 'audit-logs',        label: 'Audit log',         description: 'Change history (read-only)',   route: 'audit-logs',        apiPath: '/api/admin/audit-logs',        scaffoldOnly: true },
];

export function findCmsModule(route: string): CmsAdminModuleConfig | undefined {
  return CMS_ADMIN_MODULES.find((m) => m.route === route);
}
