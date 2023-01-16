/**
*  Autocomplete for CryptoList Search
*/
function autoComplete(
  input: HTMLInputElement,
  completeValue: Array<string>
): boolean {
  let currentFocus: number;
  input.addEventListener("input", function (e) {
    const val: string = this.value;
    closeAlllists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    const listDiv: HTMLDivElement = document.createElement("div");
    listDiv.setAttribute("id", this.id + "autocomplete-list");
    listDiv.setAttribute("class", "autocomplete-items");

    this.parentNode!.appendChild(listDiv);

    // Display intermediary results
    completeValue.forEach((elem: string) => {
      if (elem.substring(0, val.length).toUpperCase() == val.toUpperCase()) {
        const itemDiv: HTMLDivElement = document.createElement("div");
        itemDiv.innerHTML =
          "<strong>" + elem.substring(0, val.length) + "</strong>";
        itemDiv.innerHTML += elem.substring(val.length);
        itemDiv.innerHTML += "<input type='hidden' value='" + elem + ">";
        itemDiv.addEventListener("click", function (e) {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAlllists();
        });
        listDiv.appendChild(itemDiv);
      }
    });
  });

  input.addEventListener("keydown", function (e) {
    let x: HTMLDivElement = document.getElementById(
      this.id + "autocomplete-list"
    ) as HTMLDivElement;
    if (x) {
      x = x.getElementsByTagName("div");
    }
    if (e.key == "ArrowDown") {
      currentFocus++;
      addActive(x);
    } else if (e.key == "ArrowUp") {
      currentFocus--;
      addActive(x);
    } else if (e.key == "Enter") {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) {
          x[currentFocus].click();
        }
      }
    }
  });

  function addActive(x) {
    if (!x) {
      return false;
    }
    removeActive(x);
    if (currentFocus >= x.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = x.length - 1;
    }
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    x.forEach((elem) => elem.classList.remove("autocomplete-active"));
  }

  function closeAlllists(elem = null) {
    const x: HTMLCollection =
      document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elem != x[i] && elem != input) {
        x[i].parentNode!.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", (e) => {
    closeAlllists(e.target);
  });
  return true;
}
export { autoComplete };
