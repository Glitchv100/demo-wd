
// Main navbar
const mainNavbarMenuOpener = document.getElementById("menu_opener");
const mainNavbarMenu = document.getElementById("menu_items_list");
mainNavbarMenuOpener.addEventListener("click", () => {
  mainNavbarMenu.classList.toggle("closed");
})

// Services
const servicesTitle1Sentences = ["فكرة إبداعية", "خيال واسع", "إلهام", "تفرّد"];
const titlePrinterEffectText = document.getElementById("title1_printer_effect");
const togglePrinterEffectSentence = () => {
  let currentSentence = 1;
  setInterval(() => {
    titlePrinterEffectText.textContent = servicesTitle1Sentences[currentSentence];
    currentSentence++;
    if (currentSentence === servicesTitle1Sentences.length - 1) {
      currentSentence = 0;
    }
  }, 5000);
}
togglePrinterEffectSentence();

const handleOurWorksSliderSliding = () => {

}

// Our work
const ourWorksSliderLeftCtrl = document.getElementById("our_works_slider_left")
const ourWorksSliderRightCtrl = document.getElementById("our_works_slider_right")
const ourWorksSliderSlite = document.getElementById("our_works_slider_slit");
let selectedImageIndex = 0;

class clsSlider {

  #slider;
  #ctrlLeft;
  #ctrlRight;
  #puletsArray;
  #currentSlitPartIndex = 0;
  #elementsArrayToShow;

  constructor(Slider, CtrlLeft, CtrlRight, PuletsArray, ElementsArrayToShow) {
    this.#slider = Slider;
    this.#ctrlLeft = CtrlLeft;
    this.#ctrlRight = CtrlRight;
    this.#puletsArray = PuletsArray;
    this.#elementsArrayToShow = ElementsArrayToShow;
  }

  play() {
    setInterval(() => {
      this.#handlePuletClick();
      this.#handleCurrentSlitPart();
    }, 3000);
  }

  #resetSlider() {
    this.#slider.scrollTo({
      behavior: "auto",
      left: 0
    });
  }

  #increaseCurrentSlitPartIndex() {
    this.#currentSlitPartIndex++;
    if (this.#currentSlitPartIndex == this.#elementsArrayToShow.length) {
      this.#resetSlider();
      this.#currentSlitPartIndex = 0;
    }
  }

  #handleCurrentSlitPart() {
    this.#increaseCurrentSlitPartIndex();
    this.#slider.scrollTo({
      behavior: "smooth",
      left: -this.#elementsArrayToShow[0].offsetWidth * this.#currentSlitPartIndex - 1
    });
  }

  #selectActivePulet(activePulet) {
    this.#puletsArray.forEach(pulet => {
      pulet.classList.remove("selected");
      activePulet.classList.add("selected");
    })
  }

  #handlePuletClick() {
    this.#puletsArray.forEach(pulet => {
      pulet.addEventListener("click", (e) => {
        this.#selectActivePulet(e.target);
      });
    });
  }
}

class clsStatistic {

  #currentNumber = 0;
  #count;
  #elementWillShowInside;

  constructor(Count, ElementWillShowInside) {
    this.#count = Count;
    this.#elementWillShowInside = ElementWillShowInside;
  }

  #increaseCountByOne() {
    this.#currentNumber++;
  }

  #displayResult() {
    this.#elementWillShowInside.textContent = this.#currentNumber;
  }

  countFromZero() {
    const countInterval = setInterval(() => {
      this.#increaseCountByOne();
      this.#displayResult();
      if (this.#currentNumber == this.#count) {
        clearInterval(countInterval);
      }
    }, 10);
  }



}

const ourWorksSlider = new clsSlider(
  document.getElementById("our_works_slider_slit"),
  document.getElementById("our_works_slider_left"),
  document.getElementById("our_works_slider_right"),
  [...document.getElementById("our_works_slider_pulets").children],
  [...document.getElementById("our_works_slider_slit").children]
);
ourWorksSlider.play();

const statisticCampaign = new clsStatistic(70, document.getElementById("statistic_campaign"));
const statisticIdea = new clsStatistic(62, document.getElementById("statistic_idea"));
const statisticClient = new clsStatistic(112, document.getElementById("statistic_client"));
const statisticEffective = new clsStatistic(400, document.getElementById("statistic_effective"));

const statistics = document.getElementById("statistics");
let isDisplayed = false;

window.addEventListener("scroll", () => {
  if (window.scrollY + 500 >= statistics.offsetTop) {
    if (!isDisplayed) {
      statisticCampaign.countFromZero();
      statisticIdea.countFromZero();
      statisticClient.countFromZero();
      statisticEffective.countFromZero();
    }
    isDisplayed = true;
  }
})

class clsNotIndividualSlider {

  #slider;
  #puletsArray;
  #currentSlitPartIndex = 0;

  constructor(Slider, PuletsArray) {
    this.#slider = Slider;
    this.#puletsArray = PuletsArray;
  }

  play() {
    this.#slideForwardAuto();
  }

  #handlePuletsActivation() {
    this.#puletsArray.forEach(pulet => {
      pulet.classList.remove("selected");
    })
    this.#puletsArray[this.#currentSlitPartIndex].classList.add("selected");
  }

  #handleCurrentSlitPartIndex() {
    this.#currentSlitPartIndex++;
    if (this.#currentSlitPartIndex == this.#puletsArray.length - 1) {
      this.#currentSlitPartIndex = 0;
    }
    this.#handlePuletsActivation();
  }

  #slideForwardAuto() {
    setInterval(() => {
      this.#handleCurrentSlitPartIndex();
      this.#slider.scrollBy({
        behavior: "smooth",
        left: -(this.#slider.offsetWidth / this.#currentSlitPartIndex)
      })
    }, 3000);
  }
}

const ourPartnersSlider = new clsNotIndividualSlider(
  document.getElementById("our_partners_slider_slit"),
  [...document.getElementById("our_partners_slider_pulets").children]
);
ourPartnersSlider.play();