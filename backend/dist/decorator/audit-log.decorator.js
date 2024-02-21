"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const common_1 = require("@nestjs/common");
const AuditLog = (...actions) => {
    return (0, common_1.SetMetadata)('auditLogActions', actions);
};
exports.AuditLog = AuditLog;
//# sourceMappingURL=audit-log.decorator.js.map