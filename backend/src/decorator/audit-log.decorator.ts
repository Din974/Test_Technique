import { SetMetadata } from '@nestjs/common';

export const AuditLog = (...actions: string[]) => {
    return SetMetadata('auditLogActions', actions);
}