const getLeftSibling = () => document.querySelector(".b-application__description a")

const buttonID = "skzbk_download_link"
const generateLinkText = (id) => `Download only (${id})`
let liveHref = ""
function createBtn(parent) {
	const btnText = generateLinkText("")
	let btn = document.createElement("a")
	btn.textContent = btnText
	btn.id = buttonID
	btn.href = ""
	btn.target = "__blank"
	parent.appendChild(btn)
}

var observer = new MutationObserver(function (mutations, me) {
	var parent = document.getElementsByClassName("b-application__description")[0]

	if (parent) {
		if (!parent.querySelector("#" + buttonID)) {
			createBtn(parent)
		}
	}
	const link = document.querySelector(".b-application__description a")
	if (link) {
		const selected =
			document.querySelector(".select__button-text.button__text")?.textContent || ""
		const href = link.href.split("url=").at(-1)
		const newLink = document.querySelector("#" + buttonID)
		if (newLink) {
			newLink.href = decodeURIComponent(href)
			newLink.textContent = generateLinkText(selected)
		}
	}
})

observer.observe(document, {
	childList: true,
	subtree: true,
})
