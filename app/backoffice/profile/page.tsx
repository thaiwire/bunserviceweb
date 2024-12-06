"use client";
import axios from "axios";
import config from "../../config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (username === "") {
      Swal.fire({
        title: "กรุณากรอก Username",
        icon: "error",
      });
      return;
    }

    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        Swal.fire({
          title: "Password ไม่ตรงกัน",
          icon: "error",
        });
        return;
      }
    }

    try {
      const payoad = {
        username: username,
        password: password,
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem(config.tokenKey)}`,
      };

      const response = await axios.put(
        `${config.apiUrl}/api/user/update`,
        payoad,
        { headers: headers }
      );

      console.log(response.data.message);

      if (response.data.message == "success") {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1000,
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div className="card">
      <h1>Profile</h1>
      <div className="card-body">
        <div>Username</div>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="mt-5 ">
          Password (กรณีไม่ต้องการเปลื่ยนให้ปล่อยว่าง)
        </div>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="MT-5">
          ยืนยัน Password (กรณีไม่ต้องการเปลื่ยนให้ปล่อยว่าง)
        </div>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="mt-5">
          <button className="btn btn-primary" onClick={handleSave}>
            <i className="fa fa-check mr-3"></i>
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
