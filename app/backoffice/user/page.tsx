"use client";
import Modal from "@/app/components/modal";
import config from "@/app/config";
import axios from "axios";
import { useState, useEffect, use } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [levels, setLevels] = useState(["admin", "user", "engineer"]);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("admin");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/department/list`);
      setDepartments(response.data);
      console.log(response.data);
      //  setDepartmentId(response.data[0].id);
      //   fetchSections(response.data[0].id);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const fetchSections = async (departmentId: string) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/section/listByDepartment/${departmentId}`
      );
      setSections(response.data);
      // setSectionId(response.data[0].id);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleChangeDepartment = (departmentId: any) => {
    setDepartmentId(departmentId);
    fetchSections(departmentId);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/user/list`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password and Confirm Password not match",
        });
        return;
      }
      const payload = {
        username: username,
        password: password,
        level: level,
      };

      if (id == "") {
        await axios.post(`${config.apiUrl}/api/user/create`, payload);
      } else {
        await axios.put(`${config.apiUrl}/api/user/updateUsr/${id}`, payload);
        setId("");
      }

      fetchUsers();
      handleCloseModal();

      setUsername("");
      setPassword("");
      setLevel("admin");
      setConfirmPassword("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleEdit = (user: any) => {
    setId(user.id);
    setUsername(user.username);
    setPassword("");
    setConfirmPassword("");
    setLevel(user.level);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const button = await config.confirmDialog();
      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/api/user/remove/${id}`);
        fetchUsers();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="card">
      <h1>พนักงาน</h1>
      <div className="card-body">
        <button className="btn btn-primary" onClick={handleShowModal}>
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มข้อมูล
        </button>
      </div>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>UserName</th>
            <th style={{ width: "100px" }}>Level</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.level}</td>
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(user)}
                >
                  <i className="fa-solid fa-edit"></i>
                  แก้ไข
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(user.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="เพิ่มข้อมูล"
        isOpen={showModal}
        onClose={() => handleCloseModal()}
      >
        {/* <div className="flex gap-4">
          <div className="w-1/2">
            <div>Department</div>
            <select
              className="form-control w-full"
              value={departmentId}
              onChange={(e) => handleChangeDepartment(e.target.value)}
            >
              {departments.map((department: any) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <div>Section</div>
            <select
              className="form-control w-full"
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
            >
              {sections.map((section: any) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        </div> */}
        <div>Username</div>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="mt-5">Password</div>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-5">Confirm Password</div>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="mt-5">Level</div>
        <select
          className="form-control w-full"
          onChange={(e) => setLevel(e.target.value)}
        >
          {levels.map((level: any) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button className="btn btn-primary mt-5" onClick={handleSave}>
          <i className="fa-solid fa-check mr-2"></i>
          บันทึก
        </button>
      </Modal>
    </div>
  );
}
