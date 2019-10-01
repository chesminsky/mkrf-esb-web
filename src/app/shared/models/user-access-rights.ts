export interface SystemAccessRight {
    systemCode: string;
    systemName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

export interface ModuleAccessRight {
    moduleCode: string;
    moduleName: string;
    hasAccess: boolean;
    serviceAccessRights: AccessRight[];
}

export interface AccessRight {
    serviceCode: string;
    serviceName: string;
    hasAccess: boolean;
}

export interface UserAccessRights {
    systemAccessRights: SystemAccessRight[];
    moduleAccessRights: ModuleAccessRight[];
}
