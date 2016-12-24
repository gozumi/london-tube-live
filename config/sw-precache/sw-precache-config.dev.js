module.exports = {
    cacheId: 'london-tube-live-dev',
    navigateFallback: '/index.html',
    stripPrefix: 'src',
    root: 'src/',
    staticFileGlobs: [
        'src/index.html',
        'src/inline.bnudle.js',
        'src/vendor.bnudle.js',
        'src/main.bnudle.js',
        'src/styles.bundle.css'
    ]
};