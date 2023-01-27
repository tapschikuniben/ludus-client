import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout/admin-layout.component';
import { CourseInfoComponent } from './courses/course-info/course-info.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { EditPackComponent } from './packs/edit-pack/edit-pack.component';
import { NewPackComponent } from './packs/new-pack/new-pack.component';
import { PackInfoComponent } from './packs/pack-info/pack-info.component';
import { CardInfoComponent } from './points/card-info/card-info.component';
import { EditCardComponent } from './points/edit-card/edit-card.component';
import { NewCardComponent } from './points/new-card/new-card.component';
import { AdminLoginComponent } from './signin/admin-login/admin-login.component';
import { UserInfoComponent } from './users/user-info/user-info.component';


const AdminRoutes: Routes = [

    {
        path: 'admin-login', component: AdminLoginComponent
    },

    {
        path: '', component: AdminLayoutComponent, children: [
            {
                path: 'add-course', component: NewCourseComponent
            },

            {
                path: 'edit-course/:id', component: EditCourseComponent
            },

            {
                path: 'courses', component: CourseInfoComponent
            },


            {
                path: 'add-pack', component: NewPackComponent
            },

            {
                path: 'edit-pack', component: EditPackComponent
            },

            {
                path: 'packs', component: PackInfoComponent
            },

            {
                path: 'edit-pack/:id', component: EditPackComponent
            },

            {
                path: 'users', component: UserInfoComponent
            },

            {
                path: 'add-card', component: NewCardComponent
            },

            {
                path: 'edit-card', component: EditCardComponent
            },
            {
                path: 'points', component: CardInfoComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
