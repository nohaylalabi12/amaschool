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
        ];
    }
}
