import Swal from "sweetalert2";

export const config = {
  apiUrl: "http://localhost:3001",
  tokenKey: "token_bun_service",
  confirmDialog: () => {
    return Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณต้องการลบรายการนี้?",
      icon: "question",
      showCancelButton: true,
      background: "#1f2937",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
    });
  },
};

export default config;
