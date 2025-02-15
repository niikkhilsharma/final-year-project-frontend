import localFont from 'next/font/local'

export const integralcf = localFont({
	variable: '--font-integralcf',
	src: [
		{
			path: '../../public/fonts/integralcf/integralcf-regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/integralcf/integralcf-regularoblique.otf',
			weight: '400',
			style: 'oblique',
		},
		{
			path: '../../public/fonts/integralcf/integralcf-medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/integralcf/integralcf-mediumoblique.otf',
			weight: '500',
			style: 'oblique',
		},
		{
			path: '../../public/fonts/integralcf/integralcf-bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/integralcf/integralcf-boldoblique.otf',
			weight: '700',
			style: 'oblique',
		},
	],
})
