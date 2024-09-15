import localFont from 'next/font/local'

export const inter = localFont({
    src: [
        {
            path: "../public/fonts/InterDisplay-Thin.woff2",
            weight: '300',
            style: 'normal',
        },
        {
            path: "../public/fonts/InterDisplay-Regular.woff2",
            weight: '400',
            style: 'normal',
        },
        {
            path: "../public/fonts/InterDisplay-Medium.woff2",
            weight: '500',
            style: 'normal',
        },
        {
            path: "../public/fonts/InterDisplay-SemiBold.woff2",
            weight: '600',
            style: 'normal',
        },
        {
            path: "../public/fonts/InterDisplay-Bold.woff2",
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-inter',
})

export const creato = localFont({
    src: [
        {
            path: "../public/fonts/CreatoDisplay-Bold.otf",
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-creato',
})