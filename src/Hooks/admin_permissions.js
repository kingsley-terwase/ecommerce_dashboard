// @ts-nocheck
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";

export const useAdminPermissions = () => {
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [grants, setGrants] = useState([]);
    const [version, setVersion] = useState(null);
    const { error: notifyError } = useNotification();

    const fetchPermissions = async (adminId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/permissions/${adminId}`);
            const { result, success, message } = response.data;

            if (!success || !result) {
                notifyError(message || "Could not load permissions");
                setLoading(false);
                return { success: false };
            }

            setAdmin(result.admin);
            setGrants(result.grants || []);
            setVersion(result.version);
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load permissions"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchPermissions, admin, grants, version, loading };
};


export const useAssignPermissions = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const assignPermissions = async (adminId, { version, grants }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/admin/permissions/assign/${adminId}`, {
                version,
                grants,
            });

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Could not save permissions");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Permissions updated");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            // A 409 here most likely means someone else changed this admin's
            // permissions since you loaded the page — the version you sent is stale.
            const status = error.response?.status;
            const fallback =
                status === 409
                    ? "These permissions were changed elsewhere. Refresh and try again."
                    : "Could not save permissions";
            notifyError(getErrorMessage(error, fallback));
            setLoading(false);
            return { success: false, status };
        }
    };

    return { assignPermissions, loading };
};