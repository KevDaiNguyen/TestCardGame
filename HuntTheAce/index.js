
const cardObjectDefintions = [
    {id: 1, imagePath: "images/card-Kinghearts.png"},
    {id: 2, imagePath: "images/card-JackClubs.png"},
    {id: 3, imagePath: "images/card-QueenDiamonds.png"},
    {id: 4, imagePath: "images/card-AceSpades.png"},
]

const cardBackImgPath = "images/card-back-Blue.png"

const cardContainerElem = document.querySelector(".card-container")

let cards = []

const playGameButtonElem = document.getElementById("playGame")

const collapsedGridAreaTemplate = '"a a" "a a"'
const cardCollectionCellClass = ".card-pos-a"

loadGame()

function loadGame() {
    createCards()

    cards = document.querySelectorAll(".card")

    playGameButtonElem.addEventListener("click", () => {startGame()})
}

function startGame()
{
    initializeNewGame()
    startRound()
}

function initializeNewGame() {

}

function startRound() {
    initializeNewRound()
    collectionCards()
    flipCards(true)
}

function initializeNewRound() {

}

function collectionCards() {
    transformGridArea(collapsedGridAreaTemplate)
    addCardsToGridAreaCell(cardCollectionCellClass)
}

function transformGridArea(areas) {
    cardContainerElem.style.gridTemplateAreas = areas
}

function addCardsToGridAreaCell(cellPositionClassName) {
    const cellPositionElem = document.querySelector(cellPositionClassName)

    cards.forEach((card, index) => {
        addChildElement(cellPositionElem, card)
    })
}

function flipCard(card, flipToBack) {
    const innerCardElem = card.firstChild

    if (flipToBack && !innerCardElem.classList.contains("flip-it"))
    {
        innerCardElem.classList.add("flip-it")
    }
    else if (innerCardElem.classList.contains("flip-it"))
    {
        innerCardElem.classList.remove("flip-it")
    }
}

function flipCards(flipToBack) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack)
        }, index * 100)
    })
}


function createCards()
{
    cardObjectDefintions.forEach((cardItem)=>{
        createCard(cardItem)
    })
}

function createCard(cardItem){

    //create div elements that make up a card
    const cardElem = createElement('div')
    const cardInnerElem = createElement('div')
    const cardFrontElem = createElement('div')
    const cardBackElem = createElement('div')

    //create front and back image elements for a card
    const cardFrontImg = createElement('img')
    const cardBackImg = createElement('img')

    //add class and id to card element
    addClassToElement(cardElem, 'card')
    addClassToElement(cardElem, 'fly-in')
    addIdToElement(cardElem, cardItem.id)

    //add class to inner card element
    addClassToElement(cardInnerElem, 'card-inner')
    
    //add class to front card element
    addClassToElement(cardFrontElem, 'card-front')

    //add class to back card element
    addClassToElement(cardBackElem, 'card-back')

    //add src attribute and appropriate value to img element - back of card
    addSrcToImageElem(cardBackImg, cardBackImgPath)

    //add src attribute and appropriate value to img element - front of card
    addSrcToImageElem(cardFrontImg, cardItem.imagePath)

    //assign class to back image element of back of card
    addClassToElement(cardBackImg, 'card-img')
   
    //assign class to front image element of front of card
    addClassToElement(cardFrontImg, 'card-img')

    //add front image element as child element to front card element
    addChildElement(cardFrontElem, cardFrontImg)

    //add back image element as child element to back card element
    addChildElement(cardBackElem, cardBackImg)

    //add front card element as child element to inner card element
    addChildElement(cardInnerElem, cardFrontElem)

    //add back card element as child element to inner card element
    addChildElement(cardInnerElem, cardBackElem)

    //add inner card element as child element to card element
    addChildElement(cardElem, cardInnerElem)

    //add card element as child element to appropriate grid cell
    addCardToGridCell(cardElem)
}

function createElement(elemType){
    return document.createElement(elemType)

}
function addClassToElement(elem, className){
    elem.classList.add(className)
}
function addIdToElement(elem, id){
    elem.id = id
}
function addSrcToImageElem(imgElem, src){
    imgElem.src = src
}
function addChildElement(parentElem, childElem){
    parentElem.appendChild(childElem)
}

function addCardToGridCell(card)
{
    const cardPositionClassName = mapCardIdToGridCell(card)

    const cardPosElem = document.querySelector(cardPositionClassName)

    addChildElement(cardPosElem, card)

}
function mapCardIdToGridCell(card){
    let cardID = card.id

    switch(cardID) 
    {
        case "1":
            return ".card-pos-a"
        case "2":
            return ".card-pos-b"
        case "3":
            return ".card-pos-c"
        case "4":
            return ".card-pos-d"
    }
}