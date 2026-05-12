// RBAC permissions matrix - shared between middleware and admin routes

export const PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ["*"], // All permissions
  STUDENT_MANAGER: [
    "students.view", "students.edit", "students.approve", "students.email",
    "enrollments.view", "enrollments.approve", "enrollments.reject",
    "announcements.view", "announcements.create", "announcements.edit",
    "certificates.view", "certificates.issue",
    "testimonials.view", "testimonials.approve",
    "analytics.partial",
  ],
  SEO_EDITOR: [
    "blog.view", "blog.create", "blog.edit", "blog.publish",
    "gallery.view", "gallery.upload", "gallery.approve", "gallery.delete",
    "testimonials.view", "testimonials.approve",
    "faq.view", "faq.edit",
    "bot.view", "bot.edit",
    "analytics.partial",
  ],
  FINANCE_MANAGER: [
    "payments.view", "payments.refund",
    "coupons.view", "coupons.create", "coupons.edit",
    "analytics.revenue",
    "alumni.view", "alumni.edit",
  ],
  COURSE_MANAGER: [
    "courses.view", "courses.create", "courses.edit",
    "batches.view", "batches.create", "batches.edit",
    "accommodation.view", "accommodation.edit",
    "ceremonies.view", "ceremonies.create", "ceremonies.edit",
    "prearrival.view", "prearrival.edit",
    "teachers.view", "teachers.edit",
    "analytics.partial",
  ],
  TEACHER: [
    "schedule.view", "announcements.view", "announcements.create",
    "students.view_own_batch",
  ],
};

export function getPermissions(role: string): string[] {
  return PERMISSIONS[role] || [];
}

export function hasPermission(role: string, permission: string): boolean {
  const perms = getPermissions(role);
  return perms.includes("*") || perms.includes(permission);
}
