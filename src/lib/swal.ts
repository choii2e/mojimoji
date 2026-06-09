import Swal from "sweetalert2";

// 일반 모달 공통 설정 (에러, 확인창)
export const Modal = Swal.mixin({
  didOpen: (popup) => {
    popup.style.fontSize = "13px";
    popup.style.padding = "24px 24px 20px";
    popup.style.borderRadius = "16px";
  },
});

// 토스트 공통 설정 (상단 작은 알림)
export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (popup) => {
    popup.style.fontSize = "12px";
    popup.style.padding = "6px 14px";
    const bar = popup.querySelector(".swal2-timer-progress-bar") as HTMLElement;
    if (bar) {
      bar.style.background = "rgb(100, 201, 100)";
      bar.style.height = "2px";
    }
  },
});
