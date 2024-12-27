export const PUBLIC_ROUTES = {
    HOME: '/',
    ERROR: '/error',
};

export const PRIVATE_ROUTES = {
    ADVERTISEMENTS: '/advertisements',
    NEW_ADVERTISEMENT: '/advertisements/new',
    EDIT_ADVERTISEMENT: (id: string) => `/advertisements/${id}/edit`,
}