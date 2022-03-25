export const USER_ROLES = {
  SALES_MANAGER: 'sales-manager',
  SALES_EXECUTIVE: 'sales-executive',
  LEGAL_MANAGER: 'legal-manager',
  LEGAL_EXECUTIVE: 'legal-executive',
  CRM_MANAGER: 'crm-manager',
  CRM_EXECUTIVE: 'crm-executive',
  HR_MANAGER: 'hr-manager',
  HR_EXECUTIVE: 'hr-executive',
  SUPPORT_MANAGER: 'support-manager',
  SUPPORT_EXECUTIVE: 'support-executive',
  HELPER_MANAGER: 'helper-manager',
  HELPER_EXECUTIVE: 'helper-executive',
  PROJECT_MANAGER: 'project-manager',
  PROJECT_EXECUTIVE: 'project-executive',
  ADMIN: 'admin',
}

export const DEPARTMENT_LIST = [
  { label: 'Select the Dept', value: '' },
  { label: 'Admin', value: 'admin' },
  { label: 'CRM', value: 'crm' },
  { label: 'Extra', value: 'extra' },
  { label: 'Helper', value: 'helper' },
  { label: 'HR', value: 'hr' },
  { label: 'Legal', value: 'legal' },
  { label: 'project', value: 'project' },
  { label: 'Support', value: 'support' },
  { label: 'Sales', value: 'sales' },
]

export const ROLES_LIST = [
  { label: 'Select the role', value: '' },
  { label: 'Sales manager', value: USER_ROLES.SALES_MANAGER, dept: 'sales' },
  {
    label: 'Sales executive',
    value: USER_ROLES.SALES_EXECUTIVE,
    dept: 'sales',
  },
  { label: 'Legal manager', value: USER_ROLES.LEGAL_MANAGER, dept: 'legal' },
  {
    label: 'Legal executive',
    value: USER_ROLES.LEGAL_EXECUTIVE,
    dept: 'legal',
  },
  { label: 'CRM manager', value: USER_ROLES.CRM_MANAGER, dept: 'crm' },
  { label: 'CRM executive', value: USER_ROLES.CRM_EXECUTIVE, dept: 'crm' },
  { label: 'HR manager', value: USER_ROLES.HR_MANAGER, dept: 'hr' },
  { label: 'HR executive', value: USER_ROLES.HR_EXECUTIVE, dept: 'hr' },
  {
    label: 'Support manager',
    value: USER_ROLES.SUPPORT_MANAGER,
    dept: 'support',
  },
  {
    label: 'Support executive',
    value: USER_ROLES.SUPPORT_EXECUTIVE,
    dept: 'support',
  },
  { label: 'Helper manager', value: USER_ROLES.HELPER_MANAGER, dept: 'helper' },
  {
    label: 'Helper executive',
    value: USER_ROLES.HELPER_EXECUTIVE,
    dept: 'helper',
  },
  { label: 'project head', value: USER_ROLES.PROJECT_MANAGER, dept: 'project' },
  {
    label: 'project manager',
    value: USER_ROLES.PROJECT_EXECUTIVE,
    dept: 'project',
  },
  { label: 'Admin', value: USER_ROLES.ADMIN },
]
