import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';

import { Principal } from '../../shared';


@Injectable()
export class UserResolve implements CanActivate {

  constructor(private principal: Principal) { }

  canActivate() {
    return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
  }
}

@Injectable()
export class UserResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return {
        page: this.paginationUtil.parsePage('1'),
        sort: 'asc',
        predicate: this.paginationUtil.parsePredicate('id,asc'),
        ascending: this.paginationUtil.parseAscending('id,asc')
    };
  }
}


export const userMgmtRoute: Routes = [
  {
    path: 'user-management',
    component: UserMgmtComponent,
    resolve: {
      'pagingParams': UserResolvePagingParams
    },
    data: { 
      authorities: [] 
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'user/:login',
    component: UserMgmtDetailComponent,
    data: { 
      authorities: [] 
    },
    canActivate: [UserRouteAccessService]
  }
];
