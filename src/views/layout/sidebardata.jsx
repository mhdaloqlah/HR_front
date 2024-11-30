
export const SidebarData = [


  {
   
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          route: "#",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-3x2-gap-fill" viewBox="0 0 16 16">
          <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
        </svg>,
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: "/admin-dashboard",
              
            },
           
          ],
        },
        // {
        //   menuValue: 'Apps',
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   route: "#",
        //   icon: "la la-cube",
        //   subMenus: [
        //     {
        //       menuValue: 'Chats',
        //       route: "/chat",
        //     },
        //     {
        //       menuValue: 'Calls',
        //       route: "#",
        //       showMenuRoute: true,
        //       subMenusValues: [
        //           {
        //               menuValue: 'Voice Call',
        //               route: "/voice-call",
        //             },
        //           {
        //               menuValue: 'Video Call',
        //               route: "/video-call",
        //             },
        //           {
        //               menuValue: 'Outgoing Call',
        //               route: "/outgoing-call",
        //             },
        //           {
        //               menuValue: 'Incoming Call',
        //               route: "/incoming-call",
        //             },
        //       ]
        //     },
        //     {
        //       menuValue: 'Calendar',
        //       route: "/events",
        //     },
        //     {
        //       menuValue: 'Contacts',
        //       route: "/contacts",
        //     },
        //     {
        //       menuValue: 'Email',
        //       route: "/inbox",
        //     },
        //     {
        //       menuValue: 'File Manager',
        //       route: "/file-manager",
        //     },
        //   ],
        // },
      ],
    }
  ,{
      menuValue: 'All Employees',
      route: "/employees",
       hasSubRoute: false,
      showSubRoute: false,
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'All Employees',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/employees",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        </svg>,
        }],
    },  {
      menuValue: 'Employees(Not Activeted)',
      route: "/disemployees",
       hasSubRoute: false,
      showSubRoute: false,
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'Employees(Not Activeted)',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/disemployees",
          icon:  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
          <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
        </svg>,
        }],
    },{
      menuValue: 'All Employee Attendence',
      route: "/AllemployeeAttend",
       hasSubRoute: false,
      showSubRoute: false,
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'All Employee Attendence',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/AllemployeeAttend",
          icon:  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
        </svg>,
        }],
    }, {
      menuValue: 'Add attendance',
      route: "/addattendance",
       hasSubRoute: false,
      showSubRoute: false,
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'Add attendance',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/addattendance",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
        </svg>,
        }],
    }, {
      
      menuValue: 'Companies',
      hasSubRoute: false,
      showSubRoute: false,
      route: "/companies",
     
    menu: [
      // {
      //   menuValue: 'Contacts',
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   route: "/contact-list",
      //   icon: "la la-user-shield",
      // },
      {
        menuValue: 'Companies',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/companies",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
        <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
      </svg>,
      },
      // {
      //   menuValue: 'Deals',
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   route: "/deals",
      //   icon: "la la-cubes",
      // },
      // {
      //   menuValue: 'Leads',
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   route: "/leads-list",
      //   icon: "la la-chart-area",
      // },
      // {
      //   menuValue: 'Pipeline',
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   route: "/pipeline",
      //   icon: "la la-exchange-alt",
      // },
      // {
      //   menuValue: 'Analytics',
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   route: "/analytics",
      //   icon: "la la-dice",
      // },
      // {
      //   menuValue: 'Activities',
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   route: "/activities",
      //   icon: "la la-directions",
      // },
    ],
  },
    {
     
      
        hasSubRoute: false,
        showSubRoute: false,
      
        icon: "bi bi-briefcase-fill",
      
      menuValue: 'Departments',
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'Departments',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/Departments",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bezier" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
          <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.52 6.52 0 0 0 1.814 9H2.5q.186 0 .358.043a5.52 5.52 0 0 1 3.185-3.185A1.5 1.5 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.52 6.52 0 0 1 2.72 3.5H13.5q-.185 0-.358.043a5.52 5.52 0 0 0-3.185-3.185"/>
        </svg>,
        }],
    },
    {
      menuValue: 'Jobs',
      route: "/Jobs", hasSubRoute: false,
      showSubRoute: false,
      
      menu: [
      
        {
          menuValue: 'Jobs',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/Jobs",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">
          <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
          <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
        </svg>
        }],
    },
   ,{
      menuValue: 'Accommodation',
      route: "/Addresses'", hasSubRoute: false,
      showSubRoute: false,
      
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'Accommodation',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/Addresses",
          icon:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-houses-fill" viewBox="0 0 16 16">
          <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.5 2.5 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354z"/>
          <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708z"/>
        </svg> 
        }],
    },
    {
      menuValue: 'Agreement',
      route: "/agreement'", hasSubRoute: false,
      showSubRoute: false,
      
      menu: [
        // {
        //   menuValue: 'Contacts',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/contact-list",
        //   icon: "la la-user-shield",
        // },
        {
          menuValue: 'Agreement',
          hasSubRoute: false,
          showSubRoute: false,
          route: "/agreement",
          icon:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
        </svg> 
        }],
    },
      // tittle: 'EMPLOYEES',
      // showAsTab: false,
      // separateRoute: false,
      // menu: [
      //   {
      //     menuValue: 'Employees',
      //     hasSubRoute: true,
      //     showSubRoute: false,
      //     route: "#",
      //     icon: "la la-user",
      //     subMenus: [
      //       {
      //         menuValue: 'All Employees',
      //         route: "/employees",
      //       },
            // {
            //   menuValue: 'Holidays',
            //   route: "/holidays",
            // },
            // {
            //   menuValue: 'Leaves(Admin)',
            //   route: "/adminleaves",
            // },
            // {
            //   menuValue: 'Leaves(Employee)',
            //   route: "/leaves-employee",
            // },
            // {
            //   menuValue: 'Leave Settings',
            //   route: "/leave-settings",
            // },
            // {
            //   menuValue: 'Attendance (Admin)',
            //   route: "/adminattendance",
            // },
            // {
            //   menuValue: 'Attendance (Employee)',
            //   route: "/attendance-employee",
            // },
           
            // {
            //   menuValue: 'Timesheet',
            //   route: "/timesheet",
            // },
            // {
            //   menuValue: 'Shift & Schedule',
            //   route: "/shift-scheduling",
            // },
            // {
            //   menuValue: 'Overtime',
            //   route: "/overtime",
            // },
        //   ],
        // },
        // {
        //   menuValue: 'Clients',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/clients",
        //   icon: "la la-users",
        // },
      
        // {
        //   menuValue: 'Projects',
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: "la la-rocket",
        //   subMenus: [
        //     {
        //       menuValue: 'Projects',
        //       route: "/projects",
        //     },
        //     {
        //       menuValue: 'Tasks',
        //       route: "/tasks",
        //     },
        //     {
        //       menuValue: 'Tasks Board',
        //       route: "/task-board",
        //     },
        //   ],
        // },
        // {
        //   menuValue: 'Tickets',
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: "la la-ticket",
        //   subMenus: [
        //     {
        //       menuValue: 'Tickets',
        //       route: "/tickets",
        //     },
        //     {
        //       menuValue: 'Ticket Details',
        //       route: "/ticket-details",
        //     },
          
        //   ],
        // },
      // ],
    
   
    // {
    //   tittle: 'HR',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
      
      
        // {
        //   menuValue: 'Sales',
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: "la la-files-o",
        //   subMenus: [
        //     {
        //       menuValue: 'Estimates',
        //       route: "/estimates",
        //     },
        //     {
        //       menuValue: 'Invoices',
        //       route: "/invoices",
        //     },
        //     {
        //       menuValue: 'Payments',
        //       route: "/payments",
        //     },
        //     {
        //       menuValue: 'Expenses',
        //       route: "/expenses",
        //     },
        //     {
        //       menuValue: 'Provident Fund',
        //       route: "/provident-fund",
        //     },
        //     {
        //       menuValue: 'Taxes',
        //       route: "/taxes",
        //     },
        //   ],
        // },
        // {
        //   menuValue: 'Accounting',
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: "la la-files-o",
        //   subMenus: [
        //     {
        //       menuValue: 'Categories',
        //       route: "/categories",
        //     },
        //     {
        //       menuValue: 'Budgets',
        //       route: "/budgets",
        //     },
        //     {
        //       menuValue: 'Budget Revenues',
        //       route: "/budget-revenues",
        //     },
        //     {
        //       menuValue: 'Budget Expenses',
        //       route: "/budget-expenses",
        //     },
           
        //   ],
        // },
  
        // {
        //   menuValue: 'Payroll',
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: "la la-money",
        //   subMenus: [
        //     {
        //       menuValue: 'Employee Salary',
        //       route: "/salary",
        //     },
        //     {
        //       menuValue: 'Payslip',
        //       route: "/salary-view",
        //     },
        //     {
        //       menuValue: 'Payroll Items',
        //       route: "/payroll-items",
        //     },
           
           
        //   ],
        // },
        // {
        //   menuValue: 'Policies',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: "/policies",
        //   icon: "la la-file-pdf-o",
        // },
    //     {
    //       menuValue: "Reports",
    //       hasSubRoute: true,
    //       showSubRoute: false,
    //       icon: "la la-chart-pie",
    //       subMenus: [
    //         {
    //           menuValue: "Expense Report",
    //           route: "/expense-reports"
    //         },
    //         {
    //           menuValue: "Invoice Report",
    //           route: "/invoice-reports"
    //         },
    //         {
    //           menuValue: "Payments Report",
    //           route: "/payments-reports"
    //         },
    //         {
    //           menuValue: "Project Report",
    //           route: "/project-reports"
    //         },
    //         {
    //           menuValue: "Task Report",
    //           route: "/task-reports"
    //         },
    //         {
    //           menuValue: "User Report",
    //           route: "/user-reports"
    //         },
    //         {
    //           menuValue: "Employee Report",
    //           route: "/employee-reports"
    //         },
    //         {
    //           menuValue: "Payslip Report",
    //           route: "/payslip-reports"
    //         },
    //         {
    //           menuValue: "Attendance Report",
    //           route: "/attendance-reports"
    //         },
    //         {
    //           menuValue: "Leave Report",
    //           route: "/leave-reports"
    //         },
    //         {
    //           menuValue: "Daily Report",
    //           route: "/daily-reports"
    //         }
    //       ]
    //     }
    //   ],
    // },
    // {
    //   tittle: 'PERFORMANCE',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //       {
    //           menuValue: "Performance",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-graduation-cap",
    //           subMenus: [
    //             {
    //               menuValue: "Performance Indicator",
    //               route: "/performance-indicator"
    //             },
    //             {
    //               menuValue: "Performance Review",
    //               route: "/performance"
    //             },
    //             {
    //               menuValue: "Performance Appraisal",
    //               route: "/performance-appraisal"
    //             }
    //           ]
    //         },
  
    //         {
    //           menuValue: "Goals",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-crosshairs",
    //           subMenus: [
    //             {
    //               menuValue: "Goal List",
    //               route: "/goal-tracking"
    //             },
    //             {
    //               menuValue: "Goal Type",
    //               route: "/goal-type"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: "Training",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-edit",
    //           subMenus: [
    //             {
    //               menuValue: "Training List",
    //               route: "/training"
    //             },
    //             {
    //               menuValue: "Trainers",
    //               route: "/trainers"
    //             },
    //             {
    //               menuValue: "Training Type",
    //               route: "/training-type"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: 'Promotion',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/promotion",
    //           icon: "la la-bullhorn",
    //         },
    //         {
    //           menuValue: 'Resignation',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/resignation",
    //           icon: "la la-external-link-square",
    //         },
    //         {
    //           menuValue: 'Termination',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/termination",
    //           icon: "la la-times-circle",
    //         },
  
            
    //   ],
    // },
  
    // {
    //   tittle: 'ADMINISTRATION',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //       {
    //           menuValue: 'Assets',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/assets",
    //           icon: "la la-object-ungroup",
    //         },
    //         {
    //           menuValue: "Jobs",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-briefcase",
    //           subMenus: [
    //             {
    //               menuValue: "User Dasboard",
    //               route: "/user-dashboard"
    //             },
    //             {
    //               menuValue: "Jobs Dasboard",
    //               route: "/jobs-dashboard"
    //             },
    //             {
    //               menuValue: "Manage Jobs",
    //               route: "/jobs"
    //             },
    //             {
    //               menuValue: "Manage Resumes",
    //               route: "/manage-resumes"
    //             },
    //             {
    //               menuValue: "Shortlist Candidates",
    //               route: "/shortlist-candidates"
    //             },
    //             {
    //               menuValue: "Interview Questions",
    //               route: "/interview-questions"
    //             },
    //             {
    //               menuValue: "Offer Approvals",
    //               route: "/offer_approvals"
    //             },
    //             {
    //               menuValue: "Experience Level",
    //               route: "/experiance-level"
    //             },
    //             {
    //               menuValue: "Candidates List",
    //               route: "/candidates"
    //             },
    //             {
    //               menuValue: "Schedule timing",
    //               route: "/schedule-timing"
    //             },
    //             {
    //               menuValue: "Aptitude Results",
    //               route: "/apptitude-result"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: 'Knowledgebase',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/knowledgebase",
    //           icon: "la la-question",
    //         },
    //         {
    //           menuValue: 'Users',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/users",
    //           icon: "la la-user-plus",
    //         },
    //         {
    //           menuValue: 'Settings',
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //           route: "/company-settings",
    //           icon: "la la-cog",
    //         },
        
    //   ],
    // },
    // {
    //   tittle: 'PAGES',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //       {
    //           menuValue: "Profile",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-user-tag",
    //           subMenus: [
    //             {
    //               menuValue: "Employee Profile",
    //               route: "/profile"
    //             },
    //             {
    //               menuValue: "Client Profile",
    //               route: "/client-profile"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: "Authentication",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-key",
    //           subMenus: [
    //             {
    //               menuValue: "Login",
    //               route: "/"
    //             },
    //             {
    //               menuValue: "Register",
    //               route: "/register"
    //             },
    //             {
    //               menuValue: "Forgot Password",
    //               route: "/forgot-password"
    //             },
    //             {
    //               menuValue: "OTP",
    //               route: "/otp"
    //             },
    //             {
    //               menuValue: "Lock Screen",
    //               route: "/lock-screen"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: "Error Pages",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-exclamation-triangle",
    //           subMenus: [
    //             {
    //               menuValue: "404 Error",
    //               route: "/error-404"
    //             },
    //             {
    //               menuValue: "500 Error",
    //               route: "/error-500"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: "Subscriptions",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-history",
    //           subMenus: [
    //             {
    //               menuValue: "Subscriptions (Admin)",
    //               route: "/subscriptions"
    //             },
    //             {
    //               menuValue: "Subscriptions (Company)",
    //               route: "/subscriptions-company"
    //             },
    //             {
    //               menuValue: "Subscribed Companies",
    //               route: "/subscribed-companies"
    //             }
    //           ]
    //         },
    //         {
    //           menuValue: "Pages",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-columns",
    //           subMenus: [
    //             {
    //               menuValue: "Search",
    //               route: "/search"
    //             },
    //             {
    //               menuValue: "FAQ",
    //               route: "/faq"
    //             },
    //             {
    //               menuValue: "Terms",
    //               route: "/terms"
    //             },
    //             {
    //               menuValue: "Privacy Policy",
    //               route: "/privacy-policy"
    //             },
    //             {
    //               menuValue: "Blank Page",
    //               route: "/blank-page"
    //             },
    //             {
    //               menuValue: "Coming Soon",
    //               route: "/coming-soon"
    //             },
    //             {
    //               menuValue: "Under Maintenance",
    //               route: "/under-maintenance"
    //             }
    //           ]
    //         }
            
    //   ],
    // },
   
   
    
   
    // {
    //   tittle: 'UI INTERFACE',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //       {
    //           menuValue: "Base UI",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "lab la-uikit",
    //           subMenus: [
    //             { menuValue: "Alerts", route: "/alerts" },
    //             { menuValue: "Accordion", route: "/accordion" },
    //             { menuValue: "Avatar", route: "/avatar" },
    //             { menuValue: "Badges", route: "/badges" },
    //             { menuValue: "Border", route: "/borders" },
    //             { menuValue: "Buttons", route: "/buttons" },
    //             { menuValue: "Button Group", route: "/buttongroup" },
    //             { menuValue: "Breadcrumb", route: "/breadcrumb" },
    //             { menuValue: "Card", route: "/cards" },
    //             { menuValue: "Carousel", route: "/carousel" },
    //             { menuValue: "Colors", route: "/colors" },
    //             { menuValue: "Dropdowns", route: "/dropdowns" },
    //             { menuValue: "Grid", route: "/grid" },
    //             { menuValue: "Images", route: "/images" },
    //             { menuValue: "Lightbox", route: "/lightbox" },
    //             { menuValue: "Media", route: "/media" },
    //             { menuValue: "Modals", route: "/modals" },
    //             { menuValue: "Notification", route: "/notification" },
    //             { menuValue: "Offcanvas", route: "/offcanvas" },
    //             { menuValue: "Pagination", route: "/pagination" },
    //             { menuValue: "Popovers", route: "/popover" },
    //             { menuValue: "Progress", route: "/progress" },
    //             { menuValue: "Placeholders", route: "/placeholders" },
    //             { menuValue: "Range Slider", route: "/rangeslider" },
    //             { menuValue: "Spinner", route: "/spinner" },
    //             { menuValue: "Sweet Alerts", route: "/sweetalert" },
    //             { menuValue: "Tabs", route: "/nav-tabs" },
    //             { menuValue: "Toasts", route: "/toastr" },
    //             { menuValue: "Tooltips", route: "/tooltips" },
    //             { menuValue: "Typography", route: "/typography" },
    //             { menuValue: "Video", route: "/video" }
    //           ]
    //         },
    //         {
    //           menuValue: "Advanced UI",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-eject",
    //           subMenus: [
    //             { menuValue: "Ribbon", route: "/ribbon" },
    //             { menuValue: "Clipboard", route: "/clipboard" },
    //             { menuValue: "Drag & Drop", route: "/dragdrop" },
    //             { menuValue: "Range Slider", route: "/rangeslider" },
    //             { menuValue: "Rating", route: "/rating" },
    //             { menuValue: "Text Editor", route: "/text-editor" },
    //             { menuValue: "Counter", route: "/counter" },
    //             { menuValue: "Scrollbar", route: "/scrollbar" },
    //             { menuValue: "Sticky Note", route: "/stickynote" },
    //             { menuValue: "Timeline", route: "/timeline" }
    //           ]
    //         },
    //         {
    //           menuValue: "Charts",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-chart-line",
    //           subMenus: [
    //             { menuValue: "Apex Charts", route: "/apex-charts" },
    //             { menuValue: "Chart Js", route: "/chartjs" },
    //             { menuValue: "Morris Charts", route: "/morris-charts" },
    //             { menuValue: "Flot Charts", route: "/flot-charts" },
    //             { menuValue: "Peity Charts", route: "/peity-charts" },
    //             { menuValue: "C3 Charts", route: "/charts-c3" }
    //           ]
    //         },
    //         {
    //           menuValue: "Icons",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-icons",
    //           subMenus: [
    //             { menuValue: "Fontawesome Icons", route: "/fontawesome-icons" },
    //             { menuValue: "Feather Icons", route: "/feather-icons" },
    //             { menuValue: "Ionic Icons", route: "/ionic-icons" },
    //             { menuValue: "Material Icons", route: "/material-icons" },
    //             { menuValue: "Pe7 Icons", route: "/pe7-icons" },
    //             { menuValue: "Simpleline Icons", route: "/simpleline-icons" },
    //             { menuValue: "Themify Icons", route: "/themify-icons" },
    //             { menuValue: "Weather Icons", route: "/weather-icons" },
    //             { menuValue: "Typicon Icons", route: "/typicons" },
    //             { menuValue: "Flag Icons", route: "/flag-icons" }
    //           ]
    //         },
    //         {
    //           menuValue: "Forms",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-wpforms",
    //           subMenus: [
    //             { menuValue: "Basic Inputs", route: "/form-basic-inputs" },
    //             { menuValue: "Input Groups", route: "/form-input-groups" },
    //             { menuValue: "Horizontal Form", route: "/form-horizontal" },
    //             { menuValue: "Vertical Form", route: "/form-vertical" },
    //             { menuValue: "Form Mask", route: "/form-mask" },
    //             { menuValue: "Form Validation", route: "/form-validation" },
    //             { menuValue: "Form Select2", route: "/form-select2" },
    //             { menuValue: "File Upload", route: "/file-upload" },
    //             { menuValue: "Horizontal Timeline", route: "/horizontal-timeline" },
    //             { menuValue: "Form Wizard", route: "/form-wizard" }
    //           ]
    //         },
    //         {
    //           menuValue: "Tables",
    //           hasSubRoute: true,
    //           showSubRoute: false,
    //           icon: "la la-table",
    //           subMenus: [
    //             { menuValue: "Basic Tables", route: "/tables-basic" },
    //             { menuValue: "Data Table", route: "/data-tables" }
    //           ]
    //         }
            
    //   ],
    // },
    // {
    //   tittle: 'EXTRAS',
    //   showAsTab: false,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: 'Documentation',
    //       hasSubRoute: false,
    //       showSubRoute: false,       
    //       route: "#",
    //       icon: "la la-file-text",
    //     },
  
    //     {
    //       menuValue: 'Change Log',
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       route: "#",
    //       icon: "la la-info",
    //     },
  
    //     {
    //       menuValue: "Multi Level",
    //       hasSubRoute: true,
    //       showSubRoute: false,
    //       icon: "la la-share-alt",
    //       subMenus: [
    //         { menuValue: "Level 1", route: "#" },
           
    //       ]
    //     },
       
      
    //   ],
    // },
  ];
  