"use client";

import styles from "./styles.module.css";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
import action from "@/./action/cache";
import { useFormik } from "formik";
import { loginSchema } from "./schema";

export interface UserProps {
  user: string;
  password: string;
}
async function loginPost(user: UserProps) {
  action;
  const rest = await fetch("http://localhost:3001/api/login/", {
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
function Page() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handlerLogin = async (values: { user: string; password: string }) => {
    const data: UserProps = {
      user: values.user,
      password: values.password,
    };
    try {
      const token = await loginPost(data);

      console.log(token);

      localStorage.setItem("token", token.token);
      router.push(`/blogs/${values.user}`);
    } catch (error) {
      console.log(error);
    }
  };
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
      <h1>Iniciar secion</h1>
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
