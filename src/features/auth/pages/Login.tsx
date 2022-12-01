import { Button, message } from "antd";
import LocalStorage from "apis/LocalStorage";
import R from "assets";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getMe, setUser } from "redux/slice/user.slice";
import { PROTECTED_ROUTES_PATH, PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { Input, InputPassword } from "shared/components/Input";
import { ContainerAuth } from "shared/container/ContainerAuth";
import { Head } from "shared/container/Head";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import * as Yup from "yup";

export const Login = () => {
  const dispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().max(55, "Tối đa 55 ký tự").required("Required!"),
      password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Required!"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      fetch("http://localhost:8000/wp-json/jwt-auth/v1/token", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: values.email,
          password: values.password,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result?.data?.status === 403) {
              message.error("Tên đăng nhập hoặc mật khẩu không chính xác!");
              setLoading(false);
            } else {
              CliCookieService.set(
                CLI_COOKIE_KEYS.ACCESS_TOKEN,
                result.token?.replace(/"/g, "")
              );
              dispatch(getMe());
              setLoading(false);
              LocalStorage.setUsername(result.user_display_name);
              LocalStorage.setToken(result.token);

              const accountType = Number(result?.user_nicename.split("-")[1]);
              LocalStorage.setUserType(`${accountType}`);
              if (accountType === 1 || !accountType) {
                navigate(PROTECTED_ROUTES_PATH.HOME);
              } else if (accountType === 2) {
                navigate(PROTECTED_ROUTES_PATH.TEACHER);
              } else {
                navigate(PROTECTED_ROUTES_PATH.STUDENT);
              }
            }
          },
          (error) => {
            console.log("error", error);
            setLoading(false);
          }
        )
        .catch((err) => {
          setLoading(false);
        });
      // CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, 'token');
      // navigate(PROTECTED_ROUTES_PATH.HOME);
    },
  });
  return (
    <div>
      <Head title="Welcome to login" />
      <ContainerAuth>
        <div className="w-full h-screen flex justify-center ">
          <div className="mx-auto my-auto">
            <div className="w-[420px] p-10 bg-white rounded-2xl shadow">
              <div className="flex justify-center">
                <img src={R.images.logo_TL} alt="logo" />
              </div>
              <div className="flex flex-col items-center text-sky-500">
                <div className="text-center py-4 font-bold text-2xl italic">
                  Trường Đại Học Thủy Lợi
                </div>
                <span className="font-semibold text-lg">
                  Trang tin tức khoa Công nghệ thông tin
                </span>
              </div>
              <div className="mt-4">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="mt-2">
                      <div className="mb-1 text-medium-grey font-medium">
                        Email hoặc số điện thoại
                      </div>
                      <Input
                        placeholder="Enter email address"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <div className="text-red-500 mt-1">
                        {formik.errors.email && formik.touched.email && (
                          <p>{formik.errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 ">
                      <div className="mb-1 text-medium-grey font-medium">
                        Mật khẩu
                      </div>
                      <InputPassword
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div className="text-red-500 mt-1">
                        {formik.errors.password && formik.touched.password && (
                          <p>{formik.errors.password}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-4 ">
                    <span className="italic text-primary-color cursor-pointer hover:underline">
                      Quên mật khẩu
                    </span>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      loading={loading}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContainerAuth>
    </div>
  );
};
