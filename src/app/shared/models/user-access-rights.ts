interface SystemAccessRight {
    systemName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

interface AccessRight {
    serviceName: string;
    hasAccess: boolean;
}

interface ModuleAccessRight {
    moduleName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

export interface UserAccessRights {
    systemAccessRights: SystemAccessRight[];
    moduleAccessRights: ModuleAccessRight[];
}
