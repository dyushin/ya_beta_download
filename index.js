const getLeftSibling = () => document.querySelector(".b-application__description a")

const buttonID = "skzbk_download_link"
const generateLinkText = (id) => `Download only (${id})`

const download = async (url) => {
	const data = await fetch(url)
	const xml = await data.text()
	const parser = new DOMParser()
	const doc = parser.parseFromString(xml, "application/xml")
	const newLink = [...doc.querySelectorAll("string")]
		.map((x) => x.textContent)
		.filter((x) => x.includes("beta.m.soft.yandex.ru"))[0]
	window.open(newLink, "__blank")
}
function createBtn(parent) {
	const btnText = generateLinkText("")
	let btn = document.createElement("a")
	btn.textContent = btnText
	btn.id = buttonID
	btn.href = "#"
	btn.target = "__blank"
	btn.onclick = function () {
		download(this.href)
		return false
	}
	parent.appendChild(btn)
}

const selectSelector = ".select__button-text.button__text"
var observer = new MutationObserver(async function (mutations, me) {
	var parent = document.getElementsByClassName("b-application__description")[0]

	if (parent) {
		if (!parent.querySelector("#" + buttonID)) {
			createBtn(parent)
		}
	}
	const select = document.querySelector(selectSelector)
	if (mutations.some((x) => x.target === select)) {
		const link = document.querySelector(".b-application__description a")
		if (link) {
			const selected = select?.textContent || ""
			const href = link.href.split("url=").at(-1)
			const newLink = document.querySelector("#" + buttonID)
			if (newLink) {
				newLink.href = decodeURIComponent(href)
				newLink.textContent = generateLinkText(selected)
			}
		}
	}
})

observer.observe(document, {
	childList: true,
	subtree: true,
})
