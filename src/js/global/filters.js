const CARDS_BLOCK = ".cards";
const CARDS_ITEM = ".cards__item";
const CARDS_ITEMS = ".cards__items";
const FILTER_CONTAINER = ".cards__filters";
const FILTER_BUTTONS = ".cards__filters-item";

export const Filters = () => {
  document.querySelectorAll(CARDS_BLOCK).forEach((block) => {
    const cards = block.querySelectorAll(CARDS_ITEM);
    const itemsWrapper = block.querySelector(CARDS_ITEMS);
    const filters = block.querySelector(FILTER_CONTAINER);

    if (!cards?.length || !itemsWrapper || !filters) return;

    const buttons = filters.querySelectorAll(FILTER_BUTTONS);
    const MODE_KEY = "cards_view_mode";

    const savedMode = localStorage.getItem(MODE_KEY);
    if (savedMode === "list") {
      setListMode(false);
    } else {
      setGridMode(false);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("is-active")) return;

        const isGrid = button.classList.contains("cards__filters-item--grid");
        const isList = button.classList.contains("cards__filters-item--list");

        if (isGrid) setGridMode(true);
        if (isList) setListMode(true);
      });
    });

    function setGridMode(save = true) {
      toggleButtons("grid");
      animateSwitch(() => {
        itemsWrapper.classList.add("cards__items--grid");
        itemsWrapper.classList.remove("cards__items--list");
      });

      if (save) localStorage.setItem(MODE_KEY, "grid");
    }

    function setListMode(save = true) {
      toggleButtons("list");
      animateSwitch(() => {
        itemsWrapper.classList.add("cards__items--list");
        itemsWrapper.classList.remove("cards__items--grid");
      });

      if (save) localStorage.setItem(MODE_KEY, "list");
    }

    function toggleButtons(active) {
      buttons.forEach((b) => b.classList.remove("is-active"));

      const target = filters.querySelector(`.cards__filters-item--${active}`);
      if (target) target.classList.add("is-active");
    }

    function animateSwitch(applyMode) {
      itemsWrapper.style.opacity = "0";
      itemsWrapper.style.transform = "scale(0.98)";
      itemsWrapper.style.transition = "opacity 0.25s ease, transform 0.25s ease";

      setTimeout(() => {
        applyMode();

        itemsWrapper.style.opacity = "1";
        itemsWrapper.style.transform = "scale(1)";
      }, 250);
    }
  });
};
