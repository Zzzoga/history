// gsap.utils.toArray(".hero__img").forEach((img, i) => {

//   // разные зоны движения, чтобы не пересекались
//   const ranges = [
//     { x: 40, y: 40 },
//     { x: 50, y: 60 },
//     { x: 60, y: 40 },
//     { x: 45, y: 55 },
//     { x: 35, y: 30 }
//   ];

//   const range = ranges[i] || { x: 40, y: 40 };

//   function float() {
//     gsap.to(img, {
//       x: gsap.utils.random(-range.x, range.x),
//       y: gsap.utils.random(-range.y, range.y),
//       rotation: gsap.utils.random(-3, 3),
//       duration: gsap.utils.random(4, 7),
//       ease: "sine.inOut",
//       onComplete: float
//     });
//   }

//   float();
// });

document.querySelectorAll(".project__item").forEach((card) => {

  const button = card.querySelector(".project__item__more");
  const anons = card.querySelector(".item__anons");
  const detail = card.querySelector(".project__item__detail");
  const overlay = card.querySelector(".project__item__overlay");

  let isOpen = false;

  button.addEventListener("click", () => {

    if (!isOpen) {
      
      // ===== ОТКРЫТИЕ =====
      gsap.to(anons, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => anons.style.display = "none"
      });

      detail.style.display = "flex";

      gsap.to(detail, {
        maxHeight: 220,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Делаем overlay красным
      gsap.to(overlay, {
        backgroundColor: "#7A2E2E",
        duration: 0.4,
        ease: "power2.out"
      });

      // фиксированная высота 440px
      gsap.set(card, { height: 440 });

      button.querySelector("span").textContent = "Свернуть";

      isOpen = true;

    } else {

      // ===== ЗАКРЫТИЕ =====
      anons.style.display = "flex";

      gsap.to(detail, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => detail.style.display = "none"
      });

      gsap.to(anons, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.2
      });

      // Возвращаем overlay в исходное состояние
      gsap.to(overlay, {
        backgroundColor: "#00000047",
        duration: 0.4,
        ease: "power2.out"
      });

      // фиксированная высота остаётся 440px
      gsap.set(card, { height: 440 });

      button.querySelector("span").textContent = "Подробнее";

      isOpen = false;
    }

  });

});