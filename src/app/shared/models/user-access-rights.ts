export interface SystemAccessRight {
    systemName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

export interface ModuleAccessRight {
    moduleName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

export interface AccessRight {
    serviceName: string;
    hasAccess: boolean;
}

export interface UserAccessRights {
    systemAccessRights: SystemAccessRight[];
    moduleAccessRights: ModuleAccessRight[];
}
