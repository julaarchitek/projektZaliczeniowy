// TABLICA AUT
const cars = [
  {
    brand: "Porsche",
    model: "911 Dakar",
    year: 2023,
    power: "480 HP",
    mileage: "18 000 km",
    price: 1189000,
    image: "assets/porsche_dakar_911.jpg",
  },
  {
    brand: "BMW",
    model: "E30 318",
    year: 1993,
    power: "113 HP",
    mileage: "335 000 km",
    price: 130000,
    image: "assets/bmw_e30_318.jpg",
  },
  {
    brand: "McLaren",
    model: "720s",
    year: 2019,
    power: "720 HP",
    mileage: "36 000 km",
    price: 1350000,
    image: "assets/mclaren_720s.jpg",
  },
  {
    brand: "BMW",
    model: "M2 competition",
    year: 2020,
    power: "480 HP",
    mileage: "25 000 km",
    price: 420000,
    image: "assets/bmv_m2_competition.jpg",
  },
  {
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2016,
    power: "525 HP",
    mileage: "34 000 km",
    price: 1300000,
    image: "assets/porsche_911_gt3rs.jpg",
  },
  {
    brand: "Fiat",
    model: "Cinquecento",
    year: 1993,
    power: "105 HP",
    mileage: "240 000 km",
    price: 40000,
    image: "assets/fiat_cinquecento.jpg",
  },
  {
    brand: "Ford",
    model: "Escort WRC",
    year: 1999,
    power: "300 HP",
    mileage: "268 000 km",
    price: 670000,
    image: "assets/ford_escort_wrc.jpg",
  },
  {
    brand: "Lamborghini",
    model: "Huracán Super Trofeo EVO2",
    year: 2023,
    power: "620 HP",
    mileage: "15 000 km",
    price: 1000000,
    image: "assets/lamborghini_huracan_super_trofeo_evo_2.jpg",
  },
  {
    brand: "Mercedes",
    model: "GLA 45 AMG",
    year: 2021,
    power: "380 HP",
    mileage: "124 000 km",
    price: 370000,
    image: "assets/mercedes_gla_amg_45.jpg",
  },
  {
    brand: "Mitsubishi",
    model: "Lancer Evo X",
    year: 2015,
    power: "295 HP",
    mileage: "189 000 km",
    price: 170000,
    image: "assets/mitsubishi_lancer_evo_X.jpg",
  },
  {
    brand: "Audi",
    model: "RS e-tron GT performance",
    year: 2024,
    power: "925 HP",
    mileage: "200 km",
    price: 750000,
    image: "assets/audi_etron_gt_rs_performance.jpg",
  },
  {
    brand: "Porsche",
    model: "981 Cayman",
    year: 2012,
    power: "295 HP",
    mileage: "56 000 km",
    price: 380000,
    image: "assets/porsche_718_cayman.jpg",
  },
];

// TABLICA AKCESORIÓW
const accessories = [
  { id: 1, name: "engine tuning", price: 50000 },
  { id: 2, name: "suspension tuning", price: 30000 },
  { id: 3, name: "body tuning", price: 13000 },
  { id: 4, name: "interior tuning", price: 7000 },
];

let selectedCar = null;
let selectedAccessories = [];

const $container = document.getElementById("container");
const $heading = document.getElementById("heading");
const $searchInput = document.getElementById("searchInput");
const $carList = document.getElementById("carList");
const $selectedCar = document.getElementById("selectedCar");
const $selectedCarDiv = document.getElementById("selectedCarDiv");
const $purchaseForm = document.getElementById("purchaseForm");

document.addEventListener("DOMContentLoaded", function () {
  renderCars(cars);
  $searchInput.addEventListener("input", filterCars);

  if (localStorage.getItem("purchaseCompleted") === "true") {
    $fullnameInput.value = "";
    localStorage.removeItem("purchaseCompleted");
  } else {
    const savedName = localStorage.getItem("fullname");
    if (savedName) $fullnameInput.value = savedName;
  }
});

// Działanie "Car Catalog"
const $carCatalog = document.getElementById("carCatalog");
$carCatalog.addEventListener("click", function () {
  if (!$carList.classList.contains("hidden")) {
    $container.scrollIntoView({ behavior: "smooth" });
  } else {
    $carList.classList.remove("hidden");
    $selectedCar.classList.add("hidden");
    $purchaseForm.classList.remove("hidden");
    $searchInput.classList.remove("hidden");
    $heading.textContent = "choose your fighter";
    $container.scrollIntoView();
  }
});

// Działanie "Homepage"
const $homepage = document.getElementById("homepage");
const $mainScreen = document.getElementById("mainScreen");
$homepage.addEventListener("click", function () {
  $mainScreen.scrollIntoView({ behavior: "smooth" });
});

// FUNKCJA "Render Cars"
function renderCars(carsToRender) {
  $carList.innerHTML = "";
  if (carsToRender.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "error";
    noResults.textContent = "no cars found matching your search";
    $carList.appendChild(noResults);
  } else {
    carsToRender.forEach((car) => {
      const carDiv = document.createElement("div");
      carDiv.className = "carDiv";

      const carImg = document.createElement("img");
      carImg.className = "carImg";
      carImg.src = car.image;
      carImg.alt = car.model;

      const carDataDiv = document.createElement("div");

      const modelP = document.createElement("p");
      modelP.className = "carModel";
      modelP.textContent = `${car.brand} ${car.model}`;

      const yearP = document.createElement("p");
      const yearLabel = document.createElement("span");
      yearLabel.className = "carData";
      yearLabel.textContent = "year: ";
      yearP.appendChild(yearLabel);
      yearP.appendChild(document.createTextNode(car.year));

      const powerP = document.createElement("p");
      const powerLabel = document.createElement("span");
      powerLabel.className = "carData";
      powerLabel.textContent = "power: ";
      powerP.appendChild(powerLabel);
      powerP.appendChild(document.createTextNode(car.power));

      const mileageP = document.createElement("p");
      const mileageLabel = document.createElement("span");
      mileageLabel.className = "carData";
      mileageLabel.textContent = "mileage: ";
      mileageP.appendChild(mileageLabel);
      mileageP.appendChild(document.createTextNode(car.mileage));

      const priceP = document.createElement("p");
      const priceLabel = document.createElement("span");
      priceLabel.className = "carData";
      priceLabel.textContent = "price: ";
      priceP.appendChild(priceLabel);
      priceP.appendChild(
        document.createTextNode(`${car.price.toLocaleString("pl-PL")} PLN`)
      );

      carDataDiv.appendChild(modelP);
      carDataDiv.appendChild(yearP);
      carDataDiv.appendChild(powerP);
      carDataDiv.appendChild(mileageP);
      carDataDiv.appendChild(priceP);

      carDiv.appendChild(carImg);
      carDiv.appendChild(carDataDiv);

      carDiv.addEventListener("click", () => selectCar(car));
      $carList.appendChild(carDiv);
    });
  }
}

// FUNKCJA "Filter Car"
function filterCars() {
  const filterValue = $searchInput.value.toLowerCase();
  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(filterValue)
  );
  renderCars(filteredCars);
}

// FUNKCJA "Select Car"
function selectCar(car) {
  selectedCar = car;
  localStorage.setItem("selectedCar", JSON.stringify(car));
  $container.scrollIntoView();
  $carList.classList.add("hidden");
  $selectedCar.classList.remove("hidden");
  $searchInput.classList.add("hidden");
  $heading.textContent = "chosen fighter";
  $selectedCarDiv.innerHTML = "";

  const selectedCarImg = document.createElement("img");
  selectedCarImg.className = "carImg";
  selectedCarImg.src = car.image;
  selectedCarImg.alt = car.model;

  const selectedCarDataDiv = document.createElement("div");
  selectedCarDataDiv.className = "infoDiv";

  const selectedModelP = document.createElement("p");
  selectedModelP.className = "carModel";
  selectedModelP.textContent = `${car.brand} ${car.model}`;

  const selectedYearP = document.createElement("p");
  const selectedYearLabel = document.createElement("span");
  selectedYearLabel.className = "carData";
  selectedYearLabel.textContent = "year: ";
  selectedYearP.appendChild(selectedYearLabel);
  selectedYearP.appendChild(document.createTextNode(car.year));

  const selectedPowerP = document.createElement("p");
  const selectedPowerLabel = document.createElement("span");
  selectedPowerLabel.className = "carData";
  selectedPowerLabel.textContent = "power: ";
  selectedPowerP.appendChild(selectedPowerLabel);
  selectedPowerP.appendChild(document.createTextNode(car.power));

  const selectedMileageP = document.createElement("p");
  const selectedMileageLabel = document.createElement("span");
  selectedMileageLabel.className = "carData";
  selectedMileageLabel.textContent = "mileage: ";
  selectedMileageP.appendChild(selectedMileageLabel);
  selectedMileageP.appendChild(document.createTextNode(car.mileage));

  const selectedPriceP = document.createElement("p");
  selectedPriceP.className = "selectedPriceP";
  const selectedPriceLabel = document.createElement("span");
  selectedPriceLabel.className = "carData";
  selectedPriceLabel.textContent = "price: ";
  selectedPriceP.appendChild(selectedPriceLabel);
  selectedPriceP.appendChild(
    document.createTextNode(`${car.price.toLocaleString("pl-PL")} PLN`)
  );

  selectedCarDataDiv.appendChild(selectedModelP);
  selectedCarDataDiv.appendChild(selectedYearP);
  selectedCarDataDiv.appendChild(selectedPowerP);
  selectedCarDataDiv.appendChild(selectedMileageP);
  selectedCarDataDiv.appendChild(selectedPriceP);

  $selectedCarDiv.appendChild(selectedCarImg);
  $selectedCarDiv.appendChild(selectedCarDataDiv);

  fillDeliveryDates();
  renderAccessories();
  updateTotalPrice();
}

// FUNKCJA "Fill Delivery Dates"
const $deliveryDate = document.getElementById("deliveryDate");
function fillDeliveryDates() {
  $deliveryDate.innerHTML = "";
  const today = new Date();
  for (let i = 0; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const option = document.createElement("option");
    option.value = date.toISOString().split("T")[0];
    option.textContent = date.toLocaleDateString();
    $deliveryDate.appendChild(option);
  }
}

// FUNKCJA "Render Accessories"
const $accessoriesList = document.getElementById("accessoriesList");
function renderAccessories() {
  $accessoriesList.innerHTML = "";
  accessories.forEach((acc) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = acc.id;
    checkbox.onchange = (e) => {
      const id = parseInt(e.target.value);
      if (e.target.checked) {
        selectedAccessories.push(id);
      } else {
        selectedAccessories = selectedAccessories.filter((i) => i !== id);
      }
      updateTotalPrice();
    };

    const accessoriesContent = document.createElement("div");
    accessoriesContent.className = "accessoriesContent";

    const accessoryItem = document.createElement("p");
    accessoryItem.className = "accessoryItem";
    const accessoryLabel = document.createElement("span");
    accessoryLabel.className = "accessoryLabel";
    accessoryLabel.textContent = `${acc.name}`;
    accessoryItem.appendChild(accessoryLabel);
    accessoryItem.appendChild(
      document.createTextNode(`- ${acc.price.toLocaleString("pl-PL")} PLN`)
    );

    accessoriesContent.appendChild(checkbox);
    accessoriesContent.appendChild(accessoryItem);

    $accessoriesList.appendChild(accessoriesContent);
  });
}

// FUNKCJA "Get Total Price"
function getTotalPrice() {
  const basePrice = selectedCar?.price || 0;
  const accPrice = accessories
    .filter((a) => selectedAccessories.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  return basePrice + accPrice;
}

// FUNKCJA "Update Total Price"
const $totalPrice = document.getElementById("totalPrice");
function updateTotalPrice() {
  $totalPrice.innerHTML = "";
  const totalPriceLabel = document.createElement("p");
  totalPriceLabel.className = "totalPriceLabel";
  totalPriceLabel.textContent = "total price:";
  const totalPriceValue = document.createElement("p");
  totalPriceValue.className = "totalPriceValue";
  totalPriceValue.textContent = `${getTotalPrice().toLocaleString(
    "pl-PL"
  )} PLN`;
  $totalPrice.appendChild(totalPriceLabel);
  $totalPrice.appendChild(totalPriceValue);
}

// Działanie "Buy Button"
const $buyButton = document.getElementById("buyButton");
const $fullnameInput = document.getElementById("fullname");
const $errorDiv = document.getElementById("errorDiv");
$buyButton.addEventListener("click", function () {
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );

  $errorDiv.innerHTML = "";

  if ($fullnameInput.value === "" && !selectedPayment) {
    $errorDiv.classList.remove("hidden");
    $errorDiv.textContent = "you must complete all required fields";
    return;
  }

  if ($fullnameInput.value === "") {
    $errorDiv.classList.remove("hidden");
    $errorDiv.textContent = "enter your full name";
    return;
  }

  const nameTwoStrings = $fullnameInput.value
    .split(" ")
    .filter((part) => part.length > 0);
  if (nameTwoStrings.length !== 2) {
    $errorDiv.classList.remove("hidden");
    $errorDiv.textContent =
      "enter your full name as two words (e.g. Billie Eilish)";
    return;
  }

  if (!selectedPayment) {
    $errorDiv.classList.remove("hidden");
    $errorDiv.textContent = "choose a payment method";
    return;
  }

  $errorDiv.classList.add("hidden");
  localStorage.setItem("purchaseCompleted", "true");
  showSummary();
});

// FUNKCJA "Show Summary"
const $summary = document.getElementById("summary");
function showSummary() {
  $purchaseForm.classList.add("hidden");
  $summary.classList.remove("hidden");
  $summary.innerHTML = "";

  const priceGone = document.querySelector(".selectedPriceP");
  priceGone.remove();

  $heading.textContent = "thank you for your purchase!";

  const infoDiv = document.querySelector(".infoDiv");

  if (selectedAccessories.length > 0) {
    const selectedAccessoriesLabel = document.createElement("p");
    selectedAccessoriesLabel.className = "summaryLabels";
    selectedAccessoriesLabel.textContent = "selected accessories:";
    $summary.appendChild(selectedAccessoriesLabel);

    const selectedAccessoriesList = document.createElement("ul");
    selectedAccessories.forEach((id) => {
      const accessory = accessories.find((a) => a.id === id);
      if (accessory) {
        const selectedAccessory = document.createElement("li");
        selectedAccessory.textContent = `${accessory.name}`;
        selectedAccessoriesList.appendChild(selectedAccessory);
      }
    });
    $summary.appendChild(selectedAccessoriesList);
  } else {
    const noSelectedAccessoriesLabel = document.createElement("p");
    noSelectedAccessoriesLabel.className = "summaryLabels";
    noSelectedAccessoriesLabel.textContent = "no accessories selected";
    $summary.appendChild(noSelectedAccessoriesLabel);
  }

  const selectedPaymentDiv = document.createElement("div");
  selectedPaymentDiv.className = "selectedPaymentDiv";
  const selectedPaymentP = document.createElement("p");
  selectedPaymentP.className = "summaryLabels";
  selectedPaymentP.textContent = "payment method:";
  const selectedPaymentV = document.createElement("p");
  selectedPaymentV.className = "selectedPayment";
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );
  selectedPaymentV.textContent = selectedPayment
    ? selectedPayment.value
    : "none selected";
  selectedPaymentDiv.appendChild(selectedPaymentP);
  selectedPaymentDiv.appendChild(selectedPaymentV);
  $summary.appendChild(selectedPaymentDiv);

  const totalPriceP = document.createElement("p");
  totalPriceP.className = "summaryLabels";
  totalPriceP.textContent = "total price:";
  const totalPriceDiv = document.createElement("div");
  totalPriceDiv.className = "totalDiv";
  const totalPriceV = document.createElement("p");
  totalPriceV.className = "totalValue";
  totalPriceV.textContent = `${getTotalPrice().toLocaleString("pl-PL")} PLN`;
  totalPriceDiv.appendChild(totalPriceV);
  $summary.appendChild(totalPriceP);
  $summary.appendChild(totalPriceDiv);

  const selectedDeliveryDate = $deliveryDate.value;
  const deliveryP = document.createElement("p");
  deliveryP.className = "summaryLabels";
  deliveryP.textContent = "delivery date:";
  const deliveryDiv = document.createElement("div");
  deliveryDiv.className = "totalDiv";
  const deliveryV = document.createElement("p");
  deliveryV.className = "totalValue";
  deliveryV.textContent = `${new Date(selectedDeliveryDate).toLocaleDateString(
    "pl-PL"
  )}`;
  deliveryDiv.appendChild(deliveryV);
  $summary.appendChild(deliveryP);
  $summary.appendChild(deliveryDiv);

  infoDiv.appendChild($summary);
}

// Działanie "Back Button"
const $backButton = document.getElementById("backButton");
$backButton.addEventListener("click", function () {
  $selectedCar.classList.add("hidden");
  $purchaseForm.classList.remove("hidden");
  $carList.classList.remove("hidden");
  $errorDiv.classList.add("hidden");
  $fullnameInput.value = "";
  $container.scrollIntoView();
});

// Zapisanie danych w Local Storage
$fullnameInput.addEventListener("input", () => {
  localStorage.setItem("fullname", $fullnameInput.value);
});

document.querySelectorAll('input[name="payment"]').forEach((input) => {
  input.addEventListener("change", () => {
    localStorage.setItem("paymentMethod", input.value);
  });
});
