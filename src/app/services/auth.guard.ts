import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { VkService } from './vk.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private vkService: VkService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.vkService.loginStatus()
            .then(() => { return true; })
            .catch(() => {
                this.router.navigate(['/login']);
                return false;
            });
    }
}
