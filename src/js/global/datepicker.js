import AirDatepicker from "air-datepicker";
import localeEn from "air-datepicker/locale/en";

import "air-datepicker/air-datepicker.css";

const DATEPICKER_CONTAINER = ".site-header__navigation-datepicker";
const DATEPICKER_INPUT = ".site-header__date";

export const DatePicker = () => {
  document.querySelectorAll(DATEPICKER_CONTAINER).forEach((block) => {
    const datePickerInputs = block.querySelectorAll(DATEPICKER_INPUT);

    if (!datePickerInputs?.length) return;

    datePickerInputs.forEach((input) => {
      new AirDatepicker(input, {
        locale: localeEn,
        dateFormat: (date) => {
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString();
          const year = date.getFullYear();
          return `${day}_${month}_${year}`;
        },
        navTitles: {
          days: "MMM yyyy",
        },
        container: input.parentNode,
        autoClose: true,
      });
    });
  });
};
