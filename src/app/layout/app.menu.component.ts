import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Sales Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Analytics Dashboard',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/dashboard-analytics']
                    },
                ]
            },
            {
                label: 'Grades',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['grades/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['grades/create']
                    },

                ]
            },
            {
                label: 'Classes',
                icon: 'pi pi-fw pi-clone',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['class/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['class/create']
                    },

                ]
            },
            {
                label: 'Students',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['student/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['student/create']
                    }

                ]
            },

               {
                label: 'Rooms',
                              icon: 'pi pi-fw pi-bars',
                              items: [
                                  {
                                      label: 'List',
                                      icon: 'pi pi-fw pi-list',
                                      routerLink: ['rooms/list']
                                  },
                                  {
                                      label: 'Create',
                                      icon: 'pi pi-fw pi-plus',
                                      routerLink: ['rooms/create']
                                  }
                              ]
                          },



            // {
            //     label: 'Courses',
            //     icon: 'pi pi-fw pi-clone',
            //     items: [
            //         {
            //             label: 'List',
            //             icon: 'pi pi-fw pi-list',
            //             routerLink: ['course/list']
            //         },
            //         {
            //             label: 'Create',
            //             icon: 'pi pi-fw pi-plus',
            //             routerLink: ['course/create']
            //         },

            //     ]
            // },
            {
                label: 'Administrative Staff',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['administrative-staff/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['administrative-staff/create']
                    }
                ]
            },
            {
                label: 'Teacher Specialties',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['teacher-specialty/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['teacher-specialty/create']
                    }
                ]
            },
            {
                label: 'Teachers',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['teachers/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['teachers/create']
                    }
                ]
            },
            {
                label: 'Staff Absences', // Nouveau
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['staff-absence/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['staff-absence/create']
                    }
                ]
            },

        ];
    }
}
