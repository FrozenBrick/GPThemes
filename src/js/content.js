// Use a cross-browser storage API:
// const storage = chrome.storage.sync || browser.storage.sync
import browser from 'webextension-polyfill'
import gpthToggleImg from '../img/gpth-toggle-circled.webp'

// console.log(gpthToggleImg)

browser.storage.sync.get('gptheme').then((data) => {
	const theme = data.gptheme || 'light'
	applyTheme(theme)
})

createAndAppendSVGStickyBtn()
// trackHtmlClassChange()

let isOptionsShown = false

const $options = document.querySelector('.gpth__options')
const $svgIcon = document.querySelector('.gpth__svg-icon')
const $themeButtons = document.querySelectorAll('.gpth__themes-btns button')

$svgIcon.addEventListener('click', toggleOptions)
// document.body.addEventListener('click', hideOptions)

$themeButtons.forEach((btn) => {
	btn.addEventListener('click', function (event) {
		const theme = event.target.id
		browser.storage.sync.set({ gptheme: theme })
		applyTheme(theme)
		toggleOptions()
	})
})

function createAndAppendSVGStickyBtn() {
	const gpthFloatingBtn = document.createElement('div')
	gpthFloatingBtn.id = 'gpthCustomizerContainer'
	gpthFloatingBtn.className = 'gpth__svg'

	/* 	let htmlCode = `
		<div class="gpth__svg-icon">🎨</div>
		<div class="gpth__options">
			<div class="gpth__themes">
				<h5>THEMES</h5>
				<div class="gpth__themes-btns">
					<button id="light" data-gpth-theme="light">☀️</button>
					<button id="dark" data-gpth-theme="dark">🌙</button>
					<button id="oled" data-gpth-theme="black">🌖</button>
				</div>
			</div>
		</div>
	` */
	// <img src="../img/gpth-icon-circled.png" alt="gpth-toggle"/>
	let htmlCode = `
		<div class="gpth__svg-icon">
			<img src="${gpthToggleImg}" alt="gpth-toggle"/>
		</div>
		<div class="gpth__options">
			<div class="gpth__themes">
				<div class="gpth__themes-btns">
					<button id="light" data-gpth-theme="light">☀️</button>
					<button id="dark" data-gpth-theme="dark">🌙</button>
					<button id="oled" data-gpth-theme="black">🌖</button>
				</div>
			</div>
		</div>
	`

	gpthFloatingBtn.innerHTML = htmlCode

	document.body.appendChild(gpthFloatingBtn)
}

function applyTheme(theme) {
	let htmlTag = document.documentElement

	// document.documentElement.className = theme === 'oled' ? 'oled dark' : theme
	if (theme === 'oled') {
		htmlTag.dataset.gptheme = theme
		htmlTag.style.colorScheme = 'dark'
		htmlTag.className = 'dark'
	} else {
		htmlTag.style.colorScheme = theme
		htmlTag.className = theme
		htmlTag.hasAttribute('data-gptheme') && htmlTag.removeAttribute('data-gptheme')
	}
}

function toggleOptions() {
	isOptionsShown = !isOptionsShown
	$options.classList.toggle('gpth-options-shown', isOptionsShown)

	if (isOptionsShown) document.body.addEventListener('click', hideOptions)
	else document.body.removeEventListener('click', hideOptions)
}

function hideOptions(event) {
	console.log(event.target)
	console.log($svgIcon.contains(event.target))

	if (!$svgIcon.contains(event.target) && !$options.contains(event.target)) {
		console.log(event.target)
		toggleOptions()
		// toggleOptions2()
	}
}

// function trackHtmlClassChange() {
// 	// Select the target element
// 	const target = document.documentElement

// 	// Create an observer instance
// 	const observer = new MutationObserver(function (mutations) {
// 		mutations.forEach(function (mutation) {
// 			if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
// 				// Do something when the class attribute changes
// 				// console.log('Class attribute has changed')
// 				// alert('Class attribute has changed')
// 				alert(target.className)
// 			}
// 		})
// 	})

// 	// Configuration of the observer:
// 	const config = { attributes: true, attributeFilter: ['class'] }

// 	// Pass in the target node, as well as the observer options
// 	observer.observe(target, config)
// }
