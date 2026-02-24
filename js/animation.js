const images = gsap.utils.toArray(".hero__img");
const hero = document.querySelector(".hero");

let centerX = hero.offsetWidth / 2;
let centerY = hero.offsetHeight / 2;

// Увеличиваем радиус в 1.5 раза
let radius = (Math.min(hero.offsetHeight, hero.offsetWidth) / 2 - 180) * 1.25;

const total = images.length;

// начальное распределение
images.forEach((img, i) => {
  const angle = (i / total) * Math.PI * 2;

  const x = centerX + radius * Math.cos(angle) - img.offsetWidth / 2;
  const y = centerY + radius * Math.sin(angle) - img.offsetHeight / 2;

  gsap.set(img, { x, y });
});

let rotationObj = { angle: 0 };

// ❗ скорость уменьшена в 2 раза (было 30 → стало 60)
const animation = gsap.to(rotationObj, {
  angle: -Math.PI * 2, // против часовой
  duration: 90,
  repeat: -1,
  ease: "none",
  onUpdate: () => {
    images.forEach((img, i) => {

      const baseAngle = (i / total) * Math.PI * 2;
      const currentAngle = baseAngle + rotationObj.angle;

      const x = centerX + radius * Math.cos(currentAngle) - img.offsetWidth / 2;
      const y = centerY + radius * Math.sin(currentAngle) - img.offsetHeight / 2;

      gsap.set(img, { x, y });
    });
  }
});

// hover pause
images.forEach(img => {
  img.addEventListener("mouseenter", () => animation.pause());
  img.addEventListener("mouseleave", () => animation.resume());
});

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