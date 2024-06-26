"use client";

import styles from "./styles.module.css";
import { revalidatePath } from "next/cache";
import { FormEvent, useState } from "react";
import actionPath from "../../../action/cache";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "./scheme";
export interface UserProps {
  user: string;
  password: string;
}

function Page() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handlerLogin = async (values: { user: string; password: string }) => {
    const dataProps: UserProps = {
      user,
      password,
    };
    try {
      const token = await loginPost(dataProps);

      if (token) {
        localStorage.setItem("token", token.token);
        router.push(`/blogs/${user}`);
      } else {
        console.log("El token es indefinido.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function loginPost(user: UserProps) {
    actionPath;
    const rest = await fetch("http://localhost:3001/api/login/created", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data = await rest.json();
    return data;
  }
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handlerLogin(values);
    },
  });
  return (
    <div className={styles.formContainer}>
      <h1>Registrate</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="usuario"
          id="user"
          name="user"
          type="user"
          onChange={formik.handleChange}
          value={formik.values.user}
        />
         {formik.touched.user && formik.errors.user && (
          <span className={styles.spanFrom}>{formik.errors.user}</span>
        )}
        <input
          placeholder="contraseña"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
         {formik.touched.password && formik.errors.password && (
          <span className={styles.spanFrom}>{formik.errors.password}</span>
        )}
        <button>Ingresar</button>
      </form>
    </div>
  );
}

export default Page;
