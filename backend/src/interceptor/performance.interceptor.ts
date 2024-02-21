import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { AuditLog } from '../decorator/audit-log.decorator'; // Import du décorateur AuditLog

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const auditLogActions = this.reflector.get<string[]>('auditLogActions', context.getHandler()); // Récupération des métadonnées du décorateur AuditLog

        return next.handle().pipe(
            tap(() => {
                console.log(`[${new Date().toLocaleString()}] Execution time: ${Date.now() - now}ms`);
                if (auditLogActions) {
                    console.log(`[${new Date().toLocaleString()}] Audit log actions: ${auditLogActions.join(', ')}`);
                }
            }),
        );
    }
}