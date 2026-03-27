import { useNotification } from "@/contexts/notification";
import { api } from "@/lib/api";
import { useRequest } from "@/lib/request";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const qc = useQueryClient();
  const { request } = useRequest();
  const { setAuth } = useAuthStore.getState();
  const notify = useNotification();
  const navigate = useNavigate();

  const { isPending: loading, mutateAsync: login } = useMutation({
    mutationFn: request(
      async function (/**@type {Record<String, string>}*/ data) {
        const response = await api.post("/auth/login", data);
        const responseData = response.data;
        if (responseData?.success && responseData?.result?.token) {
          const result = responseData?.result;
          console.log("Login result ");
          console.log(result);
          setAuth({
            user: result?.user,
            token: result?.token,
            permission: result?.permissions,
          });
          notify.success("Login successful! 🥳");
          navigate("/");
          return;
        }
        notify.info("Error occured! Try again. ☺️");
      },
    ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { loading, login };
}

export function useLogOut() {
  const qc = useQueryClient();
  const { request } = useRequest();
  const { clearAuth } = useAuthStore.getState();
  const notify = useNotification();
  const navigate = useNavigate();

  const { isPending: loading, mutateAsync: logOut } = useMutation({
    mutationFn: request(async function () {
      const response = await api.post("/auth/logout", {});
      const responseData = response.data;
      if (responseData?.success) {
        clearAuth();
        notify.success("See you again! 😔");
        navigate("/login");
        return "SUCCESS";
      }
      notify.info("Error occured! Try again. ☺️");
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { loading, logOut };
}

export function useResetPassword() {
  const qc = useQueryClient();
  const { request } = useRequest();
  const notify = useNotification();

  const { isPending: loading, mutateAsync: resetPassword } = useMutation({
    mutationFn: request(
      async function (/**@type {Record<String, string>}*/ data) {
        const response = await api.post("/auth/reset-password", data);
        const responseData = response.data;
        if (responseData?.success) {
          notify.success("Code sent to your email! 🥳");
          return "SUCCESS";
        }
        notify.info("Error occured! Try again. ☺️");
      },
    ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { loading, resetPassword };
}

export function useVerifyPasswordReset() {
  const qc = useQueryClient();
  const { request } = useRequest();
  const notify = useNotification();

  const { isPending: loading, mutateAsync: verifyPasswordReset } = useMutation({
    mutationFn: request(
      async function (/**@type {Record<String, string>}*/ data) {
        const response = await api.post("/auth/verify-forgot-password", data);
        const responseData = response.data;
        if (responseData?.success) {
          notify.success("Password reset! Login. 🥳");
          return "SUCCESS";
        }
        notify.info("Error occured! Try again. ☺️");
      },
      {
        onError: (error) => {
          const responseData = error?.response?.data;
          console.log("Reset password response data");
          console.log(responseData);

          if (responseData?.error == 3) {
            notify.error("Code has expired! Enter your email. 🫩");
            return;
          }
          const message = responseData?.message;
          notify.error(message || "Verification failed! 🫩");
        },
      },
    ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { loading, verifyPasswordReset };
}
