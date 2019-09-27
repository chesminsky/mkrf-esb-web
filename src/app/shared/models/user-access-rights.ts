interface SystemAccessRight {
    systemName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

interface ModuleAccessRight {
    moduleName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

interface AccessRight {
    serviceName: string;
    hasAccess: boolean;
}

export interface UserAccessRights {
    systemAccessRights: SystemAccessRight[];
    moduleAccessRights: ModuleAccessRight[];
}
