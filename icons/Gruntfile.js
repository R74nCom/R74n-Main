grunt.loadNpmTasks('grunt-real-favicon');

grunt.initConfig({
	realFavicon: {
		favicons: {
			src: 'TODO: Path to your master picture',
			dest: 'TODO: Path to the directory where to store the icons',
			options: {
				iconsPath: 'https://R74n.com/icons',
				html: [ 'TODO: List of the HTML files where to inject favicon markups' ],
				design: {
					ios: {
						pictureAspect: 'backgroundAndMargin',
						backgroundColor: '#000000',
						margin: '32%',
						assets: {
							ios6AndPriorIcons: false,
							ios7AndLaterIcons: false,
							precomposedIcons: false,
							declareOnlyDefaultIcon: true
						}
					},
					desktopBrowser: {
						design: 'background',
						backgroundColor: '#000000',
						backgroundRadius: 0.75,
						imageScale: 0.7
					},
					windows: {
						pictureAspect: 'whiteSilhouette',
						backgroundColor: '#00ffff',
						onConflict: 'override',
						assets: {
							windows80Ie10Tile: false,
							windows10Ie11EdgeTiles: {
								small: true,
								medium: true,
								big: true,
								rectangle: true
							}
						}
					},
					androidChrome: {
						pictureAspect: 'shadow',
						themeColor: '#000000',
						manifest: {
							name: 'R74n',
							display: 'standalone',
							orientation: 'notSet',
							onConflict: 'override',
							declared: true
						},
						assets: {
							legacyIcon: false,
							lowResolutionIcons: false
						}
					},
					safariPinnedTab: {
						pictureAspect: 'blackAndWhite',
						threshold: 97.8125,
						themeColor: '#1cd2d2'
					}
				},
				settings: {
					compression: 4,
					scalingAlgorithm: 'Mitchell',
					errorOnImageTooSmall: false,
					readmeFile: false,
					htmlCodeFile: false,
					usePathAsIs: false
				},
				versioning: {
					paramName: 'v',
					paramValue: 'R74n'
				}
			}
		}
	}
});