import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

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
                    }
                ]
            },
<<<<<<< HEAD
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
=======
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


>>>>>>> origin/feature_salle
            // {
            //     label: 'Classes',
            //     icon: 'pi pi-fw pi-clone',
            //     items: [
            //         {
            //             label: 'List',
            //             icon: 'pi pi-fw pi-list',
            //             routerLink: ['classe/list']
            //         },
            //         {
            //             label: 'Create',
            //             icon: 'pi pi-fw pi-plus',
            //             routerLink: ['classe/create']
            //         }
            //     ]
            // },
            {
<<<<<<< HEAD
                label: 'Teachers',
=======
                label: 'Teacher Specialties',
>>>>>>> origin/feature_specialite_enseignant
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
<<<<<<< HEAD
                        routerLink: ['teachers/list']
=======
                        routerLink: ['teacher-specialty/list']
>>>>>>> origin/feature_specialite_enseignant
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
<<<<<<< HEAD
                        routerLink: ['teachers/create']
                    }
                ]
            },
=======
                        routerLink: ['teacher-specialty/create']
                    }
                ]
            },

>>>>>>> origin/feature_specialite_enseignant
        ];
    }
}
