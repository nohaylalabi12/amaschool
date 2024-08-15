import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./amaSchool/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'grades', loadChildren: () => import('./amaSchool/components/grade/grade.module').then(m => m.GradeModule) },
            { path: 'student', loadChildren: () => import('./amaSchool/components/student/student.module').then(m => m.StudentModule) },
            { path: 'teachers', loadChildren: () => import('./amaSchool/components/teacher/teacher.module').then(m => m.TeacherModule) },
            { path: 'teacher-specialty', loadChildren: () => import('./amaSchool/components/teacher-specialty/teacher-specialty.module').then(m => m.TeacherSpecialtyModule) },
             { path: 'rooms', loadChildren: () => import('./amaSchool/components/room/room.module').then(m => m.RoomModule) },
            { path: 'class', loadChildren: () => import('./amaSchool/components/class/class.module').then(m => m.ClassModule) },
            // { path: 'course', loadChildren: () => import('./amaSchool/components/course/course.module').then(m => m.CourseModule) },
            { path: 'administrative-staff', loadChildren: () => import('./amaSchool/components/administrative-staff/administrative-staff.module').then(m => m.AdministrativeStaffModule) },
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./amaSchool/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./amaSchool/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./amaSchool/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: 'notfound2', loadChildren: () => import('./amaSchool/components/notfound2/notfound2.module').then(m => m.Notfound2Module) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
