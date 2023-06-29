import {
  AuditProps,
  NotebookProps,
} from './notebookManagerServices/NotebookManagerInterfaces';

/**
 * Audit Log Manager
 */
export default class AuditLog {
  static log(obj: any, audit: AuditProps) {
    // log data here...
    if (obj.enableAudit) {
      obj.auditLogs.push(audit);
    }
  }
}
