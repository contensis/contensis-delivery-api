const Resources = [
    'Security_Administrator',
    'ContentType_Read',
    'ContentType_Write',
    'ContentType_Delete',
    'Entry_Read',
    'Entry_Write',
    'Entry_Delete',
    'Project_Read',
    'Project_Write',
    'Project_Delete',
    'Workflow_Administrator'
];
const OfflineAccess = 'offline_access';
const OpenId = 'openid';
export function getAllScopes() {
    return [OpenId, OfflineAccess, ...Resources].join(' ');
}
export function getResourcesScopes() {
    return Resources.join(' ');
}
