// src/components/Breadcrumb/breadcrumb.config.ts

export const staticBreadcrumbMap: Record<string, string> = {
    '/': 'Home',
    '/users': 'Users',
    '/products': 'Products',
};

export const dynamicBreadcrumbResolvers: {
    pattern: RegExp;
    getLabel: (match: RegExpMatchArray) => string;
}[] = [
        {
            // /users/:userId
            pattern: /^\/users\/(\d+)$/,
            getLabel: (match) => `User #${match[1]}`, // Placeholder — replace with real name if needed
        },
        {
            // /products/:slug
            pattern: /^\/products\/([^/]+)$/,
            getLabel: (match) =>
                decodeURIComponent(match[1])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase()), // "nike-shoes" → "Nike Shoes"
        },
    ];
