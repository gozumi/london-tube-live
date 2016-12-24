module.exports = {
    cacheId: 'london-tube-live',
    navigateFallback: '/index.html',
    stripPrefix: 'dist',
    root: 'dist/',
    staticFileGlobs: [
        'dist/index.html',
        'dist/**.js',
        'dist/**.css'
    ]
};
