export const userAccessRoles = [
  {
    id: 1,
    type: 'Admin',
    category: 'admin',
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: true,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: true,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: true,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: true,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: true,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: true,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
  {
    id: 2,
    category: 'CRM',
    type: 'CRM Manager',
    // access: ['view_crm', 'update_crm', 'manage_crm'],
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: false,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: false,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: false,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: false,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: false,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: false,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: false,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: false,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: false,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: false,
      },
    ],
  },
  {
    id: 3,
    category: 'CRM',
    type: 'CRM Executive',
    // access: ['update_crm', 'manage_crm'],
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: false,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: false,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: false,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: false,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: false,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: false,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: false,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: false,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: false,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: false,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: false,
      },
    ],
  },
  {
    id: 4,
    category: 'HR',
    type: 'HR Manager',
    // access: ['manage_users', 'view_users', 'view_roles', 'update_roles'],
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: false,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: false,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: false,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: false,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: false,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: false,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: false,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: false,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: false,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
  {
    id: 5,
    category: 'HR',
    type: 'HR Executive',
    // access: ['view_users', 'view_roles'],
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: true,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: true,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: true,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: true,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: true,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: true,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
  {
    id: 6,
    category: 'LEGAL',
    type: 'Legal Manager',
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: true,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: true,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: true,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: true,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: true,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: true,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
  {
    id: 7,
    category: 'LEGAL',
    type: 'Legal Executive',
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: true,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: true,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: true,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: true,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: true,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: true,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
  {
    id: 8,
    category: 'SALES',
    type: 'Sales Manager',
    // access: [
    //   'view_project',
    //   'view_leads',
    //   'update_leads',
    //   'manage_leads',
    //   'update_unit_status',
    // ],
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: true,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: true,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: true,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: true,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: true,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: true,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
  {
    id: 9,
    category: 'SALES',
    type: 'Sales Executive',
    // access: [
    //   'view_project',
    //   'view_leads',
    //   'update_leads',
    //   'update_unit_status',
    // ],
    access: [
      {
        key: 'manage_project',
        name: 'Manage Project',
        checked: true,
      },
      {
        key: 'view_project',
        name: 'View Project',
        checked: true,
      },
      {
        key: 'update_unit_status',
        name: 'Update Unit Status',
        checked: true,
      },
      {
        key: 'view_leads',
        name: 'View Leads',
        checked: true,
      },
      {
        key: 'update_leads',
        name: 'Update Leads',
        checked: true,
      },
      {
        key: 'manage_leads',
        name: 'Manage Leads',
        checked: true,
      },
      {
        key: 'manage_users',
        name: 'Manage Users',
        checked: true,
      },
      {
        key: 'view_users',
        name: 'View Users',
        checked: true,
      },
      {
        key: 'view_crm',
        name: 'View CRM',
        checked: true,
      },
      {
        key: 'update_crm',
        name: 'Update CRM',
        checked: true,
      },
      {
        key: 'manage_crm',
        name: 'Manage CRM',
        checked: true,
      },
      {
        key: 'view_roles',
        name: 'View roles',
        checked: true,
      },
      {
        key: 'update_roles',
        name: 'Update Roles',
        checked: true,
      },
    ],
  },
]
